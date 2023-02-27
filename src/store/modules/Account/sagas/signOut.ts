// SPDX-License-Identifier: BUSL-1.1

import {stopTrackingCurrentUser} from '@services/analytics';
import {signOut} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {showError} from '@utils/errors';
import {checkProp} from '@utils/guards';
import {call, put} from 'redux-saga/effects';

export function* signOutSaga() {
  try {
    yield call(stopTrackingCurrentUser);
    yield call(signOut);
    yield call(stopTrackingCurrentUser);
    yield put(AccountActions.SIGN_OUT.SUCCESS.create());
  } catch (error) {
    /**
     * firebase throws this error if user credentials are invalidated
     * e.g. after email is changed
     * authStateChange is triggered anyway with null user that leads to user logout
     */
    if (checkProp(error, 'code') && error.code === 'auth/no-current-user') {
      yield put(AccountActions.SIGN_OUT.SUCCESS.create());
    } else {
      yield put(AccountActions.SIGN_OUT.FAILED.create());
      showError(error);
      throw error;
    }
  }
}
