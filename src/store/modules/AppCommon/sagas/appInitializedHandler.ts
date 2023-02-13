// SPDX-License-Identifier: BUSL-1.1

import {AccountActions} from '@store/modules/Account/actions';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {DeviceActions} from '@store/modules/Devices/actions';
import {
  isFailedSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {RootState} from '@store/rootReducer';
import {put, select, take} from 'redux-saga/effects';

const INITIALIZE_ACTIONS = [
  AccountActions.USER_STATE_CHANGE,
  DeviceActions.INIT_DEVICE,
];

function* isModulesInitComplete() {
  const initSuccess: boolean = yield select((state: RootState) => {
    return !INITIALIZE_ACTIONS.find(
      action => !isSuccessSelector(action, state),
    );
  });

  if (initSuccess) {
    yield put(AppCommonActions.APP_INITIALIZED.SUCCESS.create());
    return true;
  }

  const initFailed: boolean = yield select((state: RootState) => {
    return !!INITIALIZE_ACTIONS.find(action => isFailedSelector(action, state));
  });

  if (initFailed) {
    yield put(AppCommonActions.APP_INITIALIZED.FAILED.create());
    return true;
  }

  return false;
}

export function* appInitializedHandlerSaga() {
  while (!(yield* isModulesInitComplete())) {
    yield take('*');
  }
}
