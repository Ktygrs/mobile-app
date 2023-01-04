// SPDX-License-Identifier: BUSL-1.1

import {rootLoginSessionsSelector} from '@store/modules/Sessions/selectors/rootSelector';
import {RootState} from '@store/rootReducer';

export const rootLoginSessionSelector = (state: RootState, sessionId: string) =>
  rootLoginSessionsSelector(state).activeSessions[sessionId];
