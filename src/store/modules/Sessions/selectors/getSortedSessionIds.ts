// SPDX-License-Identifier: BUSL-1.1

import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/rootReducer';

import rootSelector from './rootSelector';

const selector = createSelector(
  [
    (state: RootState) => rootSelector(state).currentSessionId,
    (state: RootState) => rootSelector(state).activeSessions,
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

export default selector;
