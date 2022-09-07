// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {AuthActions} from '@store/modules/Auth/actions';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {getErrorMessage} from '@utils/errors';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = AuthActions.UPDATE_ACCOUNT.START.create;

export function* updateAccountSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );
    const userInfo = {...action.payload.userInfo};

    if (userInfo.phoneNumber) {
      const normilizedNumber = e164PhoneNumber(userInfo.phoneNumber);
      userInfo.phoneNumber = normilizedNumber;
      userInfo.phoneNumberHash = yield call(hashPhoneNumber, normilizedNumber);
    }

    const result: SagaReturnType<typeof Api.user.modifyUser> =
      yield Api.user.modifyUser(userId, userInfo);
    yield put(AuthActions.UPDATE_ACCOUNT.SUCCESS.create(result, userInfo));
  } catch (error) {
    yield put(AuthActions.UPDATE_ACCOUNT.FAILED.create(getErrorMessage(error)));
    throw error;
  }
}
