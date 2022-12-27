// SPDX-License-Identifier: BUSL-1.1

import {ApiSession} from '@api/logins/types';
import {createAction} from '@store/utils/actions/createAction';

const ACTIVE_SESSIONS_LOAD = createAction('SESSIONS/ACTIVE_SESSIONS_LOAD', {
  START: true,
  SUCCESS: (payload: {
    currentSessionId: string;
    sessions: {
      [sessionId: string]: ApiSession;
    };
  }) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const SessionsActions = Object.freeze({
  ACTIVE_SESSIONS_LOAD,
});

export default SessionsActions;
