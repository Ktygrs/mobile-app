// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {AuthActions} from '@store/modules/Auth/actions';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {getErrorMessage} from '@utils/errors';
import {call, put, select} from 'redux-saga/effects';

export function* deleteAccountSaga() {
  try {
    let userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );

    yield call(Api.user.deleteUser, userId);
    yield put(AuthActions.DELETE_ACCOUNT.SUCCESS.create());
    yield put(AuthActions.SIGN_OUT.START.create());
  } catch (error) {
    yield put(AuthActions.DELETE_ACCOUNT.FAILED.create(getErrorMessage(error)));
  }
}
