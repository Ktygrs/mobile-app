// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AuthActions} from '@store/modules/Auth/actions';
import produce from 'immer';

export interface AuthState {
  isInitialized: boolean;
  token: string | null;
  user: User | null;
  suggestions: {
    username?: string;
  } | null;
}

type Actions = ReturnType<
  | typeof AuthActions.SET_TOKEN.STATE.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
  | typeof AuthActions.SIGN_IN_SOCIAL.SUCCESS.create
  | typeof AuthActions.INIT_USER.STATE.create
  | typeof AuthActions.FINISH_AUTH.SUCCESS.create
  | typeof AuthActions.UPDATE_ACCOUNT.SUCCESS.create
>;

const INITIAL_STATE: AuthState = {
  isInitialized: false,
  token: null,
  user: null,
  suggestions: null,
};

function reducer(state = INITIAL_STATE, action: Actions): AuthState {
  return produce(state, draft => {
    switch (action.type) {
      case AuthActions.SET_TOKEN.STATE.type:
        draft.token = action.payload.token;
        break;
      case AuthActions.INIT_USER.STATE.type:
        draft.user = action.payload.user;
        draft.isInitialized = true;
        break;
      case AuthActions.FINISH_AUTH.SUCCESS.type:
        draft.user = action.payload.result;
        break;
      case AuthActions.UPDATE_ACCOUNT.SUCCESS.type:
        draft.user = {...draft.user, ...action.payload.user};
        break;
      case AuthActions.SIGN_IN_SOCIAL.SUCCESS.type:
        draft.suggestions = {
          username: action.payload.userInfo.username,
        };
        break;
      case AuthActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
          isInitialized: true,
        };
      }
    }
  });
}

export const authReducer = reducer;
