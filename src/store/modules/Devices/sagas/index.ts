// SPDX-License-Identifier: BUSL-1.1

import {AccountActions} from '@store/modules/Account/actions';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {DeviceActions} from '@store/modules/Devices/actions';
import {initDeviceSaga} from '@store/modules/Devices/sagas/initDevice';
import {updateDeviceLocationSaga} from '@store/modules/Devices/sagas/updateDeviceLocation';
import {updateDeviceMetadataSaga} from '@store/modules/Devices/sagas/updateDeviceMetadata';
import {watchUpdateDeviceSettings} from '@store/modules/Devices/sagas/updateDeviceSettings';
import {all, fork, takeLatest} from 'redux-saga/effects';

export function* rootDevicesSaga() {
  yield all([
    takeLatest(
      [
        DeviceActions.INIT_DEVICE.START.type,
        AccountActions.USER_STATE_CHANGE.SUCCESS.type,
        // In case of USER_STATE_CHANGE.FAILED we still need to init device
        // to hide loading and show the error to the user
        AccountActions.USER_STATE_CHANGE.FAILED.type,
      ],
      initDeviceSaga,
    ),
    takeLatest(
      AppCommonActions.APP_INITIALIZED.STATE.type,
      updateDeviceLocationSaga,
    ),
    takeLatest(
      [
        DeviceActions.UPDATE_DEVICE_METADATA.START.type,
        AccountActions.USER_STATE_CHANGE.SUCCESS.type,
        AppCommonActions.APP_INITIALIZED.STATE.type,
        AppCommonActions.APP_STATE_CHANGE.STATE.type,
      ],
      updateDeviceMetadataSaga,
    ),
    fork(watchUpdateDeviceSettings),
  ]);
}
