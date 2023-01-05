// SPDX-License-Identifier: BUSL-1.1

import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/rootReducer';
import {getUniqueIdSync} from 'react-native-device-info';

import {rootLoginSessionsSelector} from './rootSelector';

export const getCurrentSessionId = createSelector(
  [(state: RootState) => rootLoginSessionsSelector(state).activeSessions],
  activeLoginSessionsById => {
    const currentDeviceUniqueId = getUniqueIdSync();

    const currentLoginSession = Object.values(activeLoginSessionsById).find(
      ({deviceUniqueId}) => deviceUniqueId === currentDeviceUniqueId,
    );

    return currentLoginSession?.sessionId ?? '';
  },
);
