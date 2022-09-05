// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {User} from '@api/user/types';
import {AuthActions} from '@store/modules/Auth/actions';
import {magicUserSelector} from '@store/modules/Auth/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {
  refUserSelector,
  usernameSelector,
} from '@store/modules/Validation/selectors';
import {t} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import {call, put, select} from 'redux-saga/effects';

export function* createUserSaga() {
  try {
    const magicUser: ReturnType<typeof magicUserSelector> = yield select(
      magicUserSelector,
    );
    const username: ReturnType<typeof usernameSelector> = yield select(
      usernameSelector,
    );
    const refUser: ReturnType<typeof refUserSelector> = yield select(
      refUserSelector,
    );

    let phoneNumber: string | null = null;
    let phoneNumberHash: string | null = null;
    if (magicUser?.phoneNumber) {
      phoneNumber = e164PhoneNumber(magicUser.phoneNumber);
      phoneNumberHash = yield call(hashPhoneNumber, phoneNumber);
    }

    const createdUser: User = yield call(Api.user.createUser, {
      username: username,
      email: magicUser?.email,
      phoneNumber: phoneNumber,
      phoneNumberHash: phoneNumberHash,
      referredBy: refUser?.id,
    });
    yield put(AuthActions.CREATE_USER.SUCCESS.create(createdUser));
  } catch (error) {
    let localizedError = '';
    if (isApiError(error, 409, 'CONFLICT_WITH_ANOTHER_USER')) {
      const {response} = error;
      if (response?.data?.data?.field === 'username') {
        localizedError = t('error.user_exist');
        yield put(
          ValidationActions.USERNAME_VALIDATION.FAILED.create(
            t('username.error.already_taken'),
          ),
        );
      } else if (response?.data?.data?.field === 'id') {
        yield put(AuthActions.FETCH_USER.START.create());
      }
    } else if (isApiError(error, 400)) {
      localizedError = t('errors.validation_error');
    } else if (isApiError(error, 404, 'REFERRAL_NOT_FOUND')) {
      localizedError = t('errors.ref_not_found');
    } else {
      localizedError = getErrorMessage(error);
    }

    yield put(AuthActions.CREATE_USER.FAILED.create(localizedError));
    throw error;
  }
}
