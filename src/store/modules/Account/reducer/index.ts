// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {SignInUserInfo} from '@services/auth/signin/types';
import {AccountActions} from '@store/modules/Account/actions';
import {ValidationActions} from '@store/modules/Validation/actions';
import produce from 'immer';

export interface AccountState {
  isInitialized: boolean;
  isAdmin: boolean | null;
  token: string | null;
  user: User | null;
  // data that is taken from the auth providers (google / apple etc)
  // and used to populate / suggest User profile later on
  userInfo: SignInUserInfo | null;
}

type Actions = ReturnType<
  | typeof AccountActions.SET_TOKEN.STATE.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
  | typeof AccountActions.SIGN_IN_SOCIAL.SUCCESS.create
  | typeof AccountActions.USER_STATE_CHANGE.SUCCESS.create
  | typeof AccountActions.USER_STATE_CHANGE.FAILED.create
  | typeof AccountActions.UPDATE_ACCOUNT.SUCCESS.create
  | typeof ValidationActions.PHONE_VALIDATION.SUCCESS.create
  | typeof ValidationActions.EMAIL_VALIDATION.SUCCESS.create
>;

const INITIAL_STATE: AccountState = {
  isInitialized: false,
  isAdmin: null,
  token: null,
  user: null,
  userInfo: null,
};

function reducer(state = INITIAL_STATE, action: Actions): AccountState {
  return produce(state, draft => {
    switch (action.type) {
      case AccountActions.SET_TOKEN.STATE.type:
        draft.token = action.payload.token;
        break;
      case AccountActions.USER_STATE_CHANGE.SUCCESS.type:
        draft.user = action.payload.user;
        draft.isAdmin = action.payload.isAdmin;
        draft.isInitialized = true;
        break;
      case AccountActions.USER_STATE_CHANGE.FAILED.type:
        draft.isInitialized = true;
        break;
      case AccountActions.UPDATE_ACCOUNT.SUCCESS.type:
      case ValidationActions.PHONE_VALIDATION.SUCCESS.type:
      case ValidationActions.EMAIL_VALIDATION.SUCCESS.type:
        draft.user = {...draft.user, ...action.payload.user};
        break;
      case AccountActions.SIGN_IN_SOCIAL.SUCCESS.type:
        draft.userInfo = action.payload.userInfo;
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
          isInitialized: true,
        };
      }
    }
  });
}

export const accountReducer = reducer;
