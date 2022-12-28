// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

import rootSelector from './rootSelector';

export default (sessionId: string) => (state: RootState) =>
  rootSelector(state, sessionId).providerId;
