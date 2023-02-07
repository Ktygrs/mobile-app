// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {TemporaryPhoneVerificationStepType} from '@store/modules/Validation/reducer';
import {createAction} from '@store/utils/actions/createAction';

const SET_TEMPORARY_PHONE_VERIFICATION_STEP = createAction(
  'SET_TEMPORARY_PHONE_VERIFICATION_STEP',
  {
    STATE: (payload: {
      temporaryPhoneVerificationStep: TemporaryPhoneVerificationStepType;
    }) => payload,
  },
);

const USERNAME_VALIDATION = createAction('USERNAME_VALIDATION', {
  START: (username: string) => ({username}),
  SUCCESS: (username: string) => ({username}),
  FAILED: (errorMessage: string) => ({errorMessage}),
  CLEAR: false,
  RESET: true,
});

const REF_USERNAME_VALIDATION = createAction('REF_USERNAME_VALIDATION', {
  START: (refUsername: string) => ({refUsername}),
  SUCCESS: (refUsername: string) => ({refUsername}),
  FAILED: (errorMessage: string) => ({errorMessage}),
  CLEAR: false,
  RESET: true,
});

const PHONE_VALIDATION = createAction('PHONE_VALIDATION', {
  START: (validationCode: string) => ({
    validationCode,
  }),
  SUCCESS: (user: User) => ({user}),
  FAILED: (errorMessage: string, errorCode: string) => ({
    errorMessage,
    errorCode,
  }),
  CLEAR_ERROR: true,
  RESET: false,
});

const EMAIL_VALIDATION = createAction('EMAIL_VALIDATION', {
  START: (validationCode: string) => ({
    validationCode,
  }),
  SUCCESS: (user: User) => ({user}),
  FAILED: (errorMessage: string, errorCode: string) => ({
    errorMessage,
    errorCode,
  }),
  CLEAR_ERROR: true,
  RESET: false,
});

export const ValidationActions = Object.freeze({
  USERNAME_VALIDATION,
  REF_USERNAME_VALIDATION,
  PHONE_VALIDATION,
  EMAIL_VALIDATION,
  SET_TEMPORARY_PHONE_VERIFICATION_STEP,
});
