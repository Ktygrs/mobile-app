// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

import {rootLoginSessionsSelector} from './rootSelector';

export const getCurrentSessionId = (state: RootState) =>
  rootLoginSessionsSelector(state).currentSessionId;
