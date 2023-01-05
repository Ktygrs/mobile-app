// SPDX-License-Identifier: BUSL-1.1

import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/rootReducer';

import {getCurrentSessionId} from './getCurrentSessionId';
import {rootLoginSessionsSelector} from './rootSelector';

export const getSortedSessionIds = createSelector(
  [
    getCurrentSessionId,
    (state: RootState) => rootLoginSessionsSelector(state).activeSessions,
  ],
  (currentSessionId, activeSessions) => {
    return Object.keys(activeSessions).sort((sessionIdA, sessionIdB) => {
      if (currentSessionId === sessionIdA) {
        return -1;
      }

      if (currentSessionId === sessionIdB) {
        return 1;
      }

      return (
        new Date(activeSessions[sessionIdB].lastActivityAt).getTime() -
        new Date(activeSessions[sessionIdA].lastActivityAt).getTime()
      );
    });
  },
);
