// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {AuthActions} from '@store/modules/Auth/actions';
import {userSelector} from '@store/modules/Auth/selectors';
import {t} from '@translations/i18n';
import {validateEmail} from '@utils/email';
import {getErrorMessage} from '@utils/errors';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = AuthActions.UPDATE_ACCOUNT.START.create;

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

    if ('email' in userInfo && !validateEmail(userInfo.email ?? '')) {
      throw new Error(t('errors.invalid_email'));
    }

    if (userInfo.phoneNumber) {
      const normalizedNumber = e164PhoneNumber(userInfo.phoneNumber);
      userInfo.phoneNumber = normalizedNumber;
      userInfo.phoneNumberHash = yield call(hashPhoneNumber, normalizedNumber);
    }

    const modifiedUser: SagaReturnType<typeof Api.user.modifyUser> =
      yield Api.user.modifyUser(user.id, userInfo);
    yield put(
      AuthActions.UPDATE_ACCOUNT.SUCCESS.create(
        modifiedUser,
        action.payload.userInfo,
      ),
    );
  } catch (error) {
    let localizedError = getErrorMessage(error);
    if (isApiError(error, 400, 'RACE_CONDITION') && user) {
      const freshUser: SagaReturnType<typeof Api.user.getUserById> = yield call(
        Api.user.getUserById,
        user.id,
      );
      yield put(
        AuthActions.UPDATE_ACCOUNT.SUCCESS.create(
          freshUser,
          action.payload.userInfo,
        ),
      );
      const {retry} = yield action.payload.raceConditionStrategy(freshUser);
      if (retry) {
        yield put(
          AuthActions.UPDATE_ACCOUNT.START.create(
            action.payload.userInfo,
            action.payload.raceConditionStrategy,
          ),
        );
      }
    } else if (isApiError(error, 400, 'INVALID_PHONE_NUMBER')) {
      localizedError = t('errors.wrong_phone_number');
    } else if (isApiError(error, 400, 'INVALID_PHONE_NUMBER_FORMAT')) {
      localizedError = t('errors.wrong_phone_number_format');
    } else if (isApiError(error, 400, 'INVALID_USERNAME')) {
      localizedError = t('errors.invalid_username');
    } else if (isApiError(error, 404, 'REFERRAL_NOT_FOUND')) {
      localizedError = t('username.error.not_found');
    } else if (isApiError(error, 409, 'CONFLICT_WITH_ANOTHER_USER')) {
      const field = error?.response?.data?.data?.field;
      switch (field) {
        case 'username':
        case 'email':
        case 'phoneNumber':
        case 'phoneNumberHash':
          localizedError = t('errors.already_taken', {field});
      }
    }
    yield put(AuthActions.UPDATE_ACCOUNT.FAILED.create(localizedError));
    throw error;
  }
}
