// SPDX-License-Identifier: BUSL-1.1

import {LoginSession} from '@api/logins/types';
import {AccountActions} from '@store/modules/Account/actions';
import {LoginSessionsActions} from '@store/modules/Sessions/actions';
import produce from 'immer';

interface State {
  activeSessions: {
    [sessionId: string]: LoginSession;
  };
}

type Actions =
  | ReturnType<typeof LoginSessionsActions.ACTIVE_SESSIONS_LOAD.SUCCESS.create>
  | ReturnType<typeof AccountActions.SIGN_OUT.SUCCESS.create>;

const INITIAL_STATE: State = {
  activeSessions: {},
};

export function loginSessionsReducer(
  state = INITIAL_STATE,
  action: Actions,
): State {
  return produce(state, draft => {
    switch (action.type) {
      case LoginSessionsActions.ACTIVE_SESSIONS_LOAD.SUCCESS.type:
        draft.activeSessions = action.payload.sessions;
        break;

      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
        };
      }
    }
  });
}
