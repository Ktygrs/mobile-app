// SPDX-License-Identifier: BUSL-1.1

import {ApiSession} from '@api/logins/types';
import {AccountActions} from '@store/modules/Account/actions';
import SessionsActions from '@store/modules/Sessions/actions';
import produce from 'immer';

interface State {
  currentSessionId: string;
  activeSessions: {
    [sessionId: string]: ApiSession;
  };
}

type Actions =
  | ReturnType<typeof SessionsActions.ACTIVE_SESSIONS_LOAD.SUCCESS.create>
  | ReturnType<typeof AccountActions.SIGN_OUT.SUCCESS.create>;

const INITIAL_STATE: State = {
  currentSessionId: '',
  activeSessions: {},
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case SessionsActions.ACTIVE_SESSIONS_LOAD.SUCCESS.type:
        {
          const {currentSessionId, sessions} = action.payload;

          draft.currentSessionId = currentSessionId;

          draft.activeSessions = sessions;
        }
        break;

      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
        };
      }
    }
  });
}

export default reducer;
