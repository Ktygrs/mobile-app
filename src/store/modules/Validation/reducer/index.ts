// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {ValidationActions} from '@store/modules/Validation/actions';
import produce from 'immer';

export interface State {
  refUser: User | null;
  temporaryPhoneNumber: string | null;
  temporaryEmail: string | null;
  smsSentTimestamp: number | null;
  emailSentTimestamp: number | null;
}

type Actions = ReturnType<
  | typeof ValidationActions.REF_USERNAME_VALIDATION.SUCCESS.create
  | typeof AccountActions.UPDATE_ACCOUNT.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
  | typeof AccountActions.SIGN_IN_PHONE.SET_TEMP_PHONE.create
  | typeof AccountActions.SIGN_IN_PHONE.SUCCESS.create
  | typeof AccountActions.SIGN_IN_PHONE.RESEND_SUCCESS.create
  | typeof AccountActions.SIGN_IN_PHONE.RESET.create
  | typeof AccountActions.SIGN_IN_EMAIL.SET_TEMP_EMAIL.create
  | typeof AccountActions.SIGN_IN_EMAIL.SUCCESS.create
  | typeof AccountActions.SIGN_IN_EMAIL.RESET.create
  | typeof ValidationActions.PHONE_VALIDATION.SUCCESS.create
  | typeof ValidationActions.PHONE_VALIDATION.FAILED.create
  | typeof ValidationActions.EMAIL_VALIDATION.SUCCESS.create
  | typeof ValidationActions.EMAIL_VALIDATION.FAILED.create
  | typeof ValidationActions.EMAIL_VALIDATION.CLEAR.create
>;

const INITIAL_STATE: State = {
  refUser: null,
  temporaryPhoneNumber: null,
  temporaryEmail: null,
  smsSentTimestamp: null,
  emailSentTimestamp: null,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ValidationActions.REF_USERNAME_VALIDATION.SUCCESS.type:
        draft.refUser = action.payload.user;
        break;
      case AccountActions.SIGN_IN_PHONE.SET_TEMP_PHONE.type:
        draft.temporaryPhoneNumber = action.payload.phoneNumber;
        draft.smsSentTimestamp = Date.now();
        break;
      case AccountActions.SIGN_IN_PHONE.RESEND_SUCCESS.type:
        draft.smsSentTimestamp = Date.now();
        break;
      case AccountActions.SIGN_IN_EMAIL.SET_TEMP_EMAIL.type:
        draft.temporaryEmail = action.payload.email;
        draft.emailSentTimestamp = Date.now();
        break;
      case AccountActions.UPDATE_ACCOUNT.SUCCESS.type:
        const userInfo = action.payload.userInfo;
        if (userInfo?.phoneNumber) {
          draft.temporaryPhoneNumber = userInfo.phoneNumber;
          draft.smsSentTimestamp = Date.now();
        }
        if (userInfo?.email) {
          draft.temporaryEmail = userInfo.email;
          draft.emailSentTimestamp = Date.now();
        }
        break;
      case AccountActions.SIGN_IN_PHONE.SUCCESS.type:
      case AccountActions.SIGN_IN_PHONE.RESET.type:
      case ValidationActions.PHONE_VALIDATION.SUCCESS.type:
        draft.temporaryPhoneNumber = null;
        break;
      case ValidationActions.PHONE_VALIDATION.FAILED.type:
        if (
          ['VALIDATION_NOT_FOUND', 'CONFLICT_WITH_ANOTHER_USER'].includes(
            action.payload.errorCode,
          )
        ) {
          draft.temporaryPhoneNumber = null;
        }
        break;
      case ValidationActions.EMAIL_VALIDATION.SUCCESS.type:
      case ValidationActions.EMAIL_VALIDATION.CLEAR.type:
      case AccountActions.SIGN_IN_EMAIL.SUCCESS.type:
      case AccountActions.SIGN_IN_EMAIL.RESET.type:
        draft.temporaryEmail = null;
        break;
      case ValidationActions.EMAIL_VALIDATION.FAILED.type:
        if (
          ['VALIDATION_NOT_FOUND', 'CONFLICT_WITH_ANOTHER_USER'].includes(
            action.payload.errorCode,
          )
        ) {
          draft.temporaryEmail = null;
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

export const validationReducer = reducer;
