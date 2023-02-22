// SPDX-License-Identifier: BUSL-1.1

import {AccountActions} from '@store/modules/Account/actions';
import {DeviceActions} from '@store/modules/Devices/actions';

export const INITIALIZE_ACTIONS = [
  AccountActions.USER_STATE_CHANGE,
  DeviceActions.GET_OR_CREATE_DEVICE_SETTINGS,
];
