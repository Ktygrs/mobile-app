// SPDX-License-Identifier: BUSL-1.1

import SessionsActions from '@store/modules/Sessions/actions';
import {takeLatestEveryUnique} from '@store/utils/sagas/effects';
import {all, takeLeading} from 'redux-saga/effects';

import endSessionSaga from './endSessionSaga';
import loadActiveSessionsSaga from './loadActiveSessionsSaga';
import unlinkProviderSaga from './unlinkProviderSaga';

function* rootSessionsSaga() {
  yield all([
    takeLeading(
      SessionsActions.ACTIVE_SESSIONS_LOAD.START.type,
      loadActiveSessionsSaga,
    ),

    takeLatestEveryUnique(
      SessionsActions.SESSION_END(null).START.type,
      endSessionSaga,
    ),

    takeLatestEveryUnique(
      SessionsActions.PROVIDER_UNLINK(null).START.type,
      unlinkProviderSaga,
    ),
  ]);
}

export default rootSessionsSaga;
