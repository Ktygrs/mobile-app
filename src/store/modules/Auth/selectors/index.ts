// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const userIdSelector = (state: RootState) => state.auth.user?.id ?? '';

export const isAuthorizedSelector = (state: RootState) => !!state.auth.user;

export const isAuthInitializedSelector = (state: RootState) =>
  state.auth.isInitialized;

export const authTokenSelector = (state: RootState) => state.auth.token;

export const userSelector = (state: RootState) => state.auth.user;

export const isPhoneNumberVerifiedSelector = (state: RootState) =>
  state.auth.user?.phoneNumber;

export const usernameSelector = (state: RootState) =>
  state.auth.user?.username || '';

export const userDataSuggestionsSelector = (state: RootState) =>
  state.auth.suggestions;
