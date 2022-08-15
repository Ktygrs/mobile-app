// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const refUserSelector = (state: RootState) => state.validation.refUser;

export const usernameSelector = (state: RootState) =>
  state.validation.username || '';

export const phoneVerificationStepSelector = (state: RootState) =>
  state.validation.phoneVerificationStep;
