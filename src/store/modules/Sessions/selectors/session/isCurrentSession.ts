// SPDX-License-Identifier: BUSL-1.1

import {getCurrentSessionId} from '@store/modules/Sessions/selectors/getCurrentSessionId';
import {RootState} from '@store/rootReducer';

export const isCurrentSession = (sessionId: string) => (state: RootState) =>
  sessionId === getCurrentSessionId(state);
