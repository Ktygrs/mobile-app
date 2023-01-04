// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

import {rootLoginSessionSelector} from './rootSelector';

export const getLoginIdentifierType =
  (sessionId: string) => (state: RootState) =>
    rootLoginSessionSelector(state, sessionId).loginIdentifierType;
