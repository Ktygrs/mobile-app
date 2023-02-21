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

export const emailNotificationByTypeSelector = (state: RootState) => {
  return state.devices.settings?.emailNotificationSettings;
};

export const pushNotificationByTypeSelector = (state: RootState) => {
  return state.devices.settings?.pushNotificationSettings;
};

export const deviceLanguageSelector = (state: RootState) => {
  return state.devices.settings?.language;
};
