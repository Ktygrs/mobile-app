// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {AccountActions} from '@store/modules/Account/actions';
import {userIdSelector} from '@store/modules/Account/selectors';
import {getErrorMessage, showError} from '@utils/errors';
import {call, put, select} from 'redux-saga/effects';

export function* deleteAccountSaga() {
  try {
    let userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );
    yield call(Api.user.deleteUser, userId);
    yield put(AccountActions.DELETE_ACCOUNT.SUCCESS.create());
    yield put(AccountActions.SIGN_OUT.START.create());
  } catch (error) {
    const localizedError = getErrorMessage(error);
    yield put(AccountActions.DELETE_ACCOUNT.FAILED.create(localizedError));
    showError(localizedError);
    throw error;
  }
}
