// SPDX-License-Identifier: BUSL-1.1

import {getUserNotificationChannels} from './getUserNotificationChannels';
import {toggleNotificationDomainOnOff} from './toggleNotificationDomainOnOff';
import {updateDeviceLocation} from './updateDeviceLocation';
import {updateDeviceMetadata} from './updateDeviceMetadata';

export const devices = Object.freeze({
  getUserNotificationChannels,
  updateDeviceMetadata,
  updateDeviceLocation,
  toggleNotificationDomainOnOff,
});
