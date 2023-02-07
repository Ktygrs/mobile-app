// SPDX-License-Identifier: BUSL-1.1

import {DeviceLocation, DeviceSettings} from '@api/devices/types';
import {createAction} from '@store/utils/actions/createAction';
import {DeepPartial} from 'redux';

const UPDATE_SETTINGS = createAction('SET_SETTINGS', {
  START: (settings: DeepPartial<DeviceSettings>) => settings,
  SUCCESS: (settings: DeviceSettings) => settings,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const UPDATE_DEVICE_METADATA = createAction('SET_DEVICE_METADATA', {
  START: (payload: {forceUpdate?: boolean}) => payload,
  SUCCESS: () => {},
  FAILED: (errorMessage: string, errorCode?: string) => ({
    errorMessage,
    errorCode,
  }),
});

const INIT_DEVICE = createAction('INIT_DEVICE', {
  START: () => {},
  SUCCESS: (deviceUniqueId: string, settings: DeviceSettings | null) => ({
    deviceUniqueId,
    settings,
  }),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const UPDATE_DEVICE_LOCATION = createAction('UPDATE_DEVICE_LOCATION', {
  START: (deviceUniqueId?: string) => ({deviceUniqueId}),
  SUCCESS: (payload: DeviceLocation) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

export const DeviceActions = Object.freeze({
  UPDATE_SETTINGS,
  INIT_DEVICE,
  UPDATE_DEVICE_LOCATION,
  UPDATE_DEVICE_METADATA,
});
