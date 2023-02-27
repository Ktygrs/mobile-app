// SPDX-License-Identifier: BUSL-1.1

import {
  DeviceLocation,
  DeviceSettings,
  NotificationDeliveryChannel,
  NotificationDomainToggle,
} from '@api/devices/types';
import {createAction} from '@store/utils/actions/createAction';
import {DeepPartial} from 'redux';

const UPDATE_SETTINGS = createAction('SET_SETTINGS', {
  START: (settings: DeepPartial<DeviceSettings>) => settings,
  SUCCESS: (settings: DeviceSettings) => settings,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const UPDATE_DEVICE_METADATA = createAction('UPDATE_DEVICE_METADATA', {
  START: (payload: {forceUpdate?: boolean; clearDeviceMetadata?: boolean}) =>
    payload,
  SUCCESS: () => {},
  FAILED: (errorMessage: string, errorCode?: string) => ({
    errorMessage,
    errorCode,
  }),
});

const GET_OR_CREATE_DEVICE_SETTINGS = createAction(
  'GET_OR_CREATE_DEVICE_SETTINGS',
  {
    START: () => {},
    SUCCESS: (deviceUniqueId: string, settings: DeviceSettings | null) => ({
      deviceUniqueId,
      settings,
    }),
    FAILED: (errorMessage: string) => ({errorMessage}),
  },
);

const UPDATE_DEVICE_LOCATION = createAction('UPDATE_DEVICE_LOCATION', {
  START: (deviceUniqueId?: string) => ({deviceUniqueId}),
  SUCCESS: (payload: DeviceLocation) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const UPDATE_NOTIFICATION_CHANNEL = createAction(
  'UPDATE_NOTIFICATION_CHANNEL',
  {
    START: (
      notificationChannel: NotificationDomainToggle,
      notificationDeliveryChannel: NotificationDeliveryChannel,
    ) => ({notificationChannel, notificationDeliveryChannel}),
    SUCCESS: (
      notificationChannel: NotificationDomainToggle,
      notificationDeliveryChannel: NotificationDeliveryChannel,
    ) => ({notificationChannel, notificationDeliveryChannel}),
    FAILED: (errorMessage: string) => ({errorMessage}),
  },
);

export const DeviceActions = Object.freeze({
  UPDATE_SETTINGS,
  GET_OR_CREATE_DEVICE_SETTINGS,
  UPDATE_DEVICE_LOCATION,
  UPDATE_DEVICE_METADATA,
  UPDATE_NOTIFICATION_CHANNEL,
});
