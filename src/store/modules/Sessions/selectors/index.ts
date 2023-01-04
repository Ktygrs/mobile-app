// SPDX-License-Identifier: BUSL-1.1

import {getCurrentSessionId} from './getCurrentSessionId';
import {getSortedSessionIds} from './getSortedSessionIds';
import {SessionSelectors} from './session';

export const LoginSessionsSelectors = Object.freeze({
  session: SessionSelectors,

  getCurrentSessionId,
  getSortedSessionIds,
});
