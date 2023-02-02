// SPDX-License-Identifier: BUSL-1.1

import {AccountActions} from '@store/modules/Account/actions';
import {isAccountInitializedSelector} from '@store/modules/Account/selectors';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {intervalUpdatesSaga} from '@store/modules/AppCommon/sagas/intervalUpdates';
import {isDevicesInitializedSelector} from '@store/modules/Devices/selectors';
import {all, fork, put, select, take, takeLatest} from 'redux-saga/effects';

function* isAppInitialized() {
  const isAuthInitialized: boolean = yield select(isAccountInitializedSelector);
  const isDevicesInitialized: boolean = yield select(
    isDevicesInitializedSelector,
  );
  return isAuthInitialized && isDevicesInitialized;
}

export function* rootAppCommonSaga() {
  yield all([
    fork(function* () {
      while (!(yield* isAppInitialized())) {
        yield take('*');
      }
      yield put(AppCommonActions.APP_INITIALIZED.STATE.create());
    }),
    takeLatest(
      AccountActions.USER_STATE_CHANGE.SUCCESS.type,
      intervalUpdatesSaga,
    ),
  ]);
}
