// SPDX-License-Identifier: BUSL-1.1

import {isAccountInitializedSelector} from '@store/modules/Account/selectors';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {isDevicesInitializedSelector} from '@store/modules/Devices/selectors';
import {fork, put, select, take} from 'redux-saga/effects';

function* isAppInitialized() {
  const isAuthInitialized: boolean = yield select(isAccountInitializedSelector);
  const isDevicesInitialized: boolean = yield select(
    isDevicesInitializedSelector,
  );
  return isAuthInitialized && isDevicesInitialized;
}

export function* rootAppCommonSaga() {
  yield fork(function* () {
    while (!(yield* isAppInitialized())) {
      yield take('*');
    }
    yield put(AppCommonActions.APP_INITIALIZED.STATE.create());
  });
}
