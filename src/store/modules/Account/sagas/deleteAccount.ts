// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {deleteAccount} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {userIdSelector} from '@store/modules/Account/selectors';
import {getErrorMessage} from '@utils/errors';
import {call, put, select} from 'redux-saga/effects';

export function* deleteAccountSaga() {
  try {
    let userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );
    yield call(Api.user.deleteUser, userId);
    yield call(deleteAccount);
    yield put(AccountActions.DELETE_ACCOUNT.SUCCESS.create());
    yield put(AccountActions.SIGN_OUT.START.create());
  } catch (error) {
    yield put(
      AccountActions.DELETE_ACCOUNT.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
