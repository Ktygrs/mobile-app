// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AuthActions} from '@store/modules/Auth/actions';
import {ValidationActions} from '@store/modules/Validation/actions';
import produce from 'immer';

export interface State {
  username: string | null;
  refUser: User | null;
  temporaryPhoneNumber: string | null;
}

type Actions = ReturnType<
  | typeof ValidationActions.USERNAME_VALIDATION.SUCCESS.create
  | typeof ValidationActions.REF_USERNAME_VALIDATION.SUCCESS.create
  | typeof AuthActions.UPDATE_ACCOUNT.SUCCESS.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
  | typeof ValidationActions.PHONE_VALIDATION.SUCCESS.create
>;

const INITIAL_STATE: State = {
  username: null,
  refUser: null,
  temporaryPhoneNumber: null,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ValidationActions.USERNAME_VALIDATION.SUCCESS.type:
        draft.username = action.payload.username;
        break;

      case ValidationActions.REF_USERNAME_VALIDATION.SUCCESS.type:
        draft.refUser = action.payload.refUser;
        break;

      case AuthActions.UPDATE_ACCOUNT.SUCCESS.type:
        draft.temporaryPhoneNumber =
          action.payload.userInfo.phoneNumber ?? null;
        break;
      case ValidationActions.PHONE_VALIDATION.SUCCESS.type:
        draft.temporaryPhoneNumber = null;
        break;
      case AuthActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
        };
      }
    }
  });
}

export const validationReducer = reducer;
