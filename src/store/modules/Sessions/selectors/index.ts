// SPDX-License-Identifier: BUSL-1.1

import getCurrentSessionId from './getCurrentSessionId';
import getSortedSessionIds from './getSortedSessionIds';
import SessionSelectors from './session';

const SessionsSelectors = Object.freeze({
  session: SessionSelectors,

  getCurrentSessionId,
  getSortedSessionIds,
});

export default SessionsSelectors;
