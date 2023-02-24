// SPDX-License-Identifier: BUSL-1.1

import {stopTrackingCurrentUser} from '@services/analytics';
import {signOut} from '@services/auth';
import {logError} from '@services/logging';
import {AccountActions} from '@store/modules/Account/actions';
import {DeviceActions} from '@store/modules/Devices/actions';
import {updateDeviceMetadataSaga} from '@store/modules/Devices/sagas/updateDeviceMetadata';
import {showError} from '@utils/errors';
import {checkProp} from '@utils/guards';
import {call, put} from 'redux-saga/effects';

export function* signOutSaga() {
  try {
    yield call(stopTrackingCurrentUser);
    try {
      yield call(
        updateDeviceMetadataSaga,
        DeviceActions.UPDATE_DEVICE_METADATA.START.create({
          forceUpdate: true,
          clearDeviceMetadata: true,
        }),
      );
    } catch (e) {
      logError(e);
    }
    yield call(signOut);
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
