// SPDX-License-Identifier: BUSL-1.1

import {getCurrentSessionId} from '@store/modules/Sessions/selectors/getCurrentSessionId';
import {RootState} from '@store/rootReducer';

import {getProviderId} from './getProviderId';

export const isAllowedUnlink = (sessionId: string) => (state: RootState) => {
  const currentSessionId = getCurrentSessionId(state);

  return (
    getProviderId(sessionId)(state) !== getProviderId(currentSessionId)(state)
  );
};
