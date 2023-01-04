// SPDX-License-Identifier: BUSL-1.1

import {LoginSessionsActions} from '@store/modules/Sessions/actions';
import {takeLatestEveryUnique} from '@store/utils/sagas/effects';
import {all, takeLeading} from 'redux-saga/effects';

import {endSessionSaga} from './endSessionSaga';
import {loadActiveSessionsSaga} from './loadActiveSessionsSaga';
import {unlinkProviderSaga} from './unlinkProviderSaga';

export function* rootLoginSessionsSaga() {
  yield all([
    takeLeading(
      LoginSessionsActions.ACTIVE_SESSIONS_LOAD.START.type,
      loadActiveSessionsSaga,
    ),

    takeLatestEveryUnique(
      LoginSessionsActions.SESSION_END(null).START.type,
      endSessionSaga,
    ),

    takeLatestEveryUnique(
      LoginSessionsActions.PROVIDER_UNLINK(null).START.type,
      unlinkProviderSaga,
    ),
  ]);
}
