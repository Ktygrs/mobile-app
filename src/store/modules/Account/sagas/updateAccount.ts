// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import {showError} from '@utils/errors';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import RNRestart from 'react-native-restart';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = AccountActions.UPDATE_ACCOUNT.START.create;

export function* updateAccountSaga(action: ReturnType<typeof actionCreator>) {
  const user: ReturnType<typeof userSelector> = yield select(userSelector);
  try {
    if (!user) {
      throw new Error('User is not populated yet');
    }

    const userInfo = {
      checksum: user.checksum,
      ...action.payload.userInfo,
    };

    if (userInfo.phoneNumber) {
      const normalizedNumber = e164PhoneNumber(userInfo.phoneNumber);

      if (!normalizedNumber) {
        throw new Error(t('errors.general_error_message'));
      }

      userInfo.phoneNumber = normalizedNumber;
      userInfo.phoneNumberHash = yield call(hashPhoneNumber, normalizedNumber);
    }

    const modifiedUser: SagaReturnType<typeof Api.user.updateAccount> =
      yield Api.user.updateAccount(user.id, userInfo);
    yield put(
      AccountActions.UPDATE_ACCOUNT.SUCCESS.create(
        modifiedUser,
        action.payload.userInfo,
      ),
    );

    if (action.payload.userInfo.language) {
      /**
       * Run it ONLY after AccountActions.UPDATE_ACCOUNT.SUCCESS action
       * It will set locale to global state and to i18n.
       * Only then we need to reload app
       */
      RNRestart.restart();
    }
  } catch (error) {
    let localizedError = null;
    if (isApiError(error, 400, 'RACE_CONDITION') && user) {
      const freshUser: SagaReturnType<typeof Api.user.getUserById> = yield call(
        Api.user.getUserById,
        user.id,
      );
      yield put(
        AccountActions.UPDATE_ACCOUNT.SUCCESS.create(
          freshUser,
          action.payload.userInfo,
        ),
      );
      const {retry} = yield action.payload.raceConditionStrategy(freshUser);
      if (retry) {
        yield put(
          AccountActions.UPDATE_ACCOUNT.START.create(
            action.payload.userInfo,
            action.payload.raceConditionStrategy,
          ),
        );
      }
    } else if (
      isApiError(error, 400, 'INVALID_PHONE_NUMBER') ||
      isApiError(error, 400, 'INVALID_PHONE_NUMBER_FORMAT')
    ) {
      localizedError = t('errors.wrong_phone_number');
    } else if (isApiError(error, 400, 'INVALID_USERNAME')) {
      localizedError = t('errors.invalid_username');
    } else if (isApiError(error, 404, 'USER_NOT_FOUND')) {
      localizedError = t('errors.user_not_found');
    } else if (isApiError(error, 404, 'REFERRAL_NOT_FOUND')) {
      localizedError = t('username.error.not_found');
    } else if (isApiError(error, 409, 'CONFLICT_WITH_ANOTHER_USER')) {
      const field = error?.response?.data?.data?.field;
      switch (field) {
        case 'username':
          localizedError = t('username.error.already_taken');
          break;
        case 'email':
          localizedError = t('errors.already_taken', {field});
          break;
        case 'phoneNumberHash':
        case 'phoneNumber':
          localizedError = t('errors.phone_number_already_in_use');
          break;
      }
    }

    if (localizedError) {
      yield put(AccountActions.UPDATE_ACCOUNT.FAILED.create(localizedError));
    } else {
      yield put(AccountActions.UPDATE_ACCOUNT.RESET.create());
      showError(error);
    }
    throw error;
  }
}
