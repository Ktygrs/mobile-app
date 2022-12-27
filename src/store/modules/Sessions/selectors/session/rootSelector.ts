// SPDX-License-Identifier: BUSL-1.1

import rootSelector from '@store/modules/Sessions/selectors/rootSelector';
import {RootState} from '@store/rootReducer';

export default (state: RootState, sessionId: string) =>
  rootSelector(state).activeSessions[sessionId];
