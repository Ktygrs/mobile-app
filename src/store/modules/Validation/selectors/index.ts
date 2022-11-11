// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const refUserSelector = (state: RootState) => state.validation.refUser;

export const temporaryPhoneNumberSelector = (state: RootState) =>
  state.validation.temporaryPhoneNumber;

export const temporaryEmailSelector = (state: RootState) =>
  state.validation.temporaryEmail;

export const phoneVerificationStepSelector = (state: RootState) =>
  state.validation.temporaryPhoneNumber ? 'code' : 'phone';

export const emailVerificationStepSelector = (state: RootState) =>
  state.validation.temporaryEmail ? 'code' : 'email';

export const smsSentTimestampSelector = (state: RootState) =>
  state.validation.smsSentTimestamp;

export const emailSentTimestampSelector = (state: RootState) =>
  state.validation.emailSentTimestamp;
