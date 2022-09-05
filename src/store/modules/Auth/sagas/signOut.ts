// SPDX-License-Identifier: BUSL-1.1

import {magic} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {put} from 'redux-saga/effects';

export function* signOutSaga() {
  try {
    yield magic.user.logout();
    yield put(AuthActions.SIGN_OUT.SUCCESS.create());
  } catch (error) {
    yield put(AuthActions.SIGN_OUT.FAILED.create());
    throw error;
  }
}
