// SPDX-License-Identifier: BUSL-1.1

import {signOut} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {getErrorMessage, showError} from '@utils/errors';
import {call, put} from 'redux-saga/effects';

export function* signOutSaga() {
  try {
    yield call(signOut);
    yield put(AccountActions.SIGN_OUT.SUCCESS.create());
  } catch (error) {
    const localizedError = getErrorMessage(error);
    showError(localizedError);
    yield put(AccountActions.SIGN_OUT.FAILED.create());
    throw error;
  }
}
