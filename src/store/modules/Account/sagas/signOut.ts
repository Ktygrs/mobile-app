// SPDX-License-Identifier: BUSL-1.1

import {stopTrackingCurrentUser} from '@services/analytics';
import {signOut} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {showError} from '@utils/errors';
import {call, put} from 'redux-saga/effects';

export function* signOutSaga() {
  try {
    yield call(signOut);
    yield call(stopTrackingCurrentUser);
    yield put(AccountActions.SIGN_OUT.SUCCESS.create());
  } catch (error) {
    yield put(AccountActions.SIGN_OUT.FAILED.create());
    showError(error);
    throw error;
  }
}
