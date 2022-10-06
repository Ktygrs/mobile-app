// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {User} from '@api/user/types';
import {AuthActions} from '@store/modules/Auth/actions';
import {t} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* finishAuthSaga(
  action: ReturnType<
    | typeof AuthActions.SIGN_IN_EMAIL.SUCCESS.create
    | typeof AuthActions.SIGN_IN_PHONE.SUCCESS.create
    | typeof AuthActions.SIGN_IN_SOCIAL.SUCCESS.create
  >,
) {
  try {
    const {userId, userInfo} = action.payload;
    let user: SagaReturnType<typeof getUser> = yield call(getUser, userId);

    if (user === null) {
      user = yield call(createUser, userInfo);
    }

    yield put(AuthActions.FINISH_AUTH.SUCCESS.create(user as User));
  } catch (error) {
    yield put(AuthActions.FINISH_AUTH.FAILED.create(getErrorMessage(error)));
    throw error;
  }
}

function* getUser(userId: string) {
  try {
    const user: SagaReturnType<typeof Api.user.getUserById> = yield call(
      Api.user.getUserById,
      userId,
    );
    return user;
  } catch (error) {
    if (isApiError(error, 404, 'USER_NOT_FOUND')) {
      return null;
    } else {
      throw error;
    }
  }
}

function* createUser({
  email,
  phoneNumber,
  firstName,
  lastName,
}: {
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
}) {
  try {
    let normalizedNumber: string | null = null;
    let phoneNumberHash: string | null = null;
    if (phoneNumber) {
      normalizedNumber = e164PhoneNumber(phoneNumber);
      phoneNumberHash = yield call(hashPhoneNumber, normalizedNumber);
    }

    let user: SagaReturnType<typeof Api.user.createUser> = yield call(
      Api.user.createUser,
      {
        firstName,
        lastName,
        email,
        phoneNumber: normalizedNumber,
        phoneNumberHash,
        clientData: {
          registrationProcessFinalizedSteps: email ? ['email'] : [],
        },
      },
    );

    return user;
  } catch (error) {
    if (isApiError(error, 409, 'CONFLICT_WITH_ANOTHER_USER')) {
      const field = error?.response?.data?.data?.field;
      if (field !== 'id') {
        throw new Error(t('errors.multiple_accounts'));
      }
    }
    throw error;
  }
}
