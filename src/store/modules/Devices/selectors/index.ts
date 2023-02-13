// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const deviceSettingsSelector = (state: RootState) =>
  state.devices.settings;

export const deviceUniqueIdSelector = (state: RootState) =>
  state.devices.deviceUniqueId as string;

export const deviceLocationSelector = (state: RootState) =>
  state.devices.location;

export const lastMetadataUpdateSelector = (state: RootState) =>
  state.devices.lastMetadataUpdateAt;
