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

const SESSION_END = createAction(
  'SESSIONS/SESSION_END',
  {
    START: (payload: {sessionId: string}) => payload,
    SUCCESS: true,
    FAILED: (errorMessage: string) => ({errorMessage}),
  },
  {
    isMultiInstanceProcess: true,
  },
);

const PROVIDER_UNLINK = createAction(
  'SESSIONS/PROVIDER_UNLINK',
  {
    START: (payload: {providerId: string}) => payload,
    SUCCESS: true,
    FAILED: (errorMessage: string) => ({errorMessage}),
  },
  {
    isMultiInstanceProcess: true,
  },
);

const SessionsActions = Object.freeze({
  ACTIVE_SESSIONS_LOAD,
  PROVIDER_UNLINK,
  SESSION_END,
});

export default SessionsActions;
