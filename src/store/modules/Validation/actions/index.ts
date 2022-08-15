// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {createAction} from '@store/utils/actions/createAction';

const USERNAME_VALIDATION = createAction('USERNAME_VALIDATION', {
  START: (username: string) => ({username}),
  SUCCESS: (username: string) => ({username}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
  CLEAR: false,
});

const REF_USERNAME_VALIDATION = createAction('REF_USERNAME_VALIDATION', {
  START: (refUsername: string, skipValidation: boolean) => ({
    refUsername,
    skipValidation,
  }),
  SUCCESS: (refUser: User | null) => ({refUser}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
  CLEAR: false,
});

const PHONE_VALIDATION = createAction('PHONE_VALIDATION', {
  START: (validationCode: string) => ({
    validationCode,
  }),
  SUCCESS: (result: User) => ({result}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

export const ValidationActions = Object.freeze({
  USERNAME_VALIDATION,
  REF_USERNAME_VALIDATION,
  PHONE_VALIDATION,
});
