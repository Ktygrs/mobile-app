// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const refUserSelector = (state: RootState) => state.validation.refUser;

export const temporaryPhoneNumberSelector = (state: RootState) =>
  state.validation.temporaryPhoneNumber;

export const phoneVerificationStepSelector = (state: RootState) =>
  state.validation.temporaryPhoneNumber ? 'code' : 'phone';
