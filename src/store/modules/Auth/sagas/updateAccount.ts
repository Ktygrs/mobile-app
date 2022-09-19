// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {AuthActions} from '@store/modules/Auth/actions';
import {userSelector} from '@store/modules/Auth/selectors';
import {getErrorMessage} from '@utils/errors';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = AuthActions.UPDATE_ACCOUNT.START.create;

export function* updateAccountSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const user: ReturnType<typeof userSelector> = yield select(userSelector);
    if (!user) {
      throw new Error('User is not populated yet');
    }

    const userInfo = {
      ...action.payload.userInfo,
      checksum: user.checksum,
    };

    if (userInfo.phoneNumber) {
      const normilizedNumber = e164PhoneNumber(userInfo.phoneNumber);
      userInfo.phoneNumber = normilizedNumber;
      userInfo.phoneNumberHash = yield call(hashPhoneNumber, normilizedNumber);
    }

    const result: SagaReturnType<typeof Api.user.modifyUser> =
      yield Api.user.modifyUser(user.id, userInfo);
    yield put(AuthActions.UPDATE_ACCOUNT.SUCCESS.create(result, userInfo));
  } catch (error) {
    yield put(AuthActions.UPDATE_ACCOUNT.FAILED.create(getErrorMessage(error)));
    throw error;
  }
}
