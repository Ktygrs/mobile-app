// SPDX-License-Identifier: BUSL-1.1

import SessionsActions from '@store/modules/Sessions/actions';
import {all, takeLeading} from 'redux-saga/effects';

import loadActiveSessionsSaga from './loadActiveSessionsSaga';

function* rootSessionsSaga() {
  yield all([
    takeLeading(
      SessionsActions.ACTIVE_SESSIONS_LOAD.START.type,
      loadActiveSessionsSaga,
    ),
  ]);
}

export default rootSessionsSaga;
