// SPDX-License-Identifier: BUSL-1.1

import {RegistrationProcessFinalizedStep} from '@api/user/types';
import {isOnboardingViewedSelector} from '@store/modules/Users/selectors';
import {RootState} from '@store/rootReducer';
import {difference} from 'lodash';

const REQUIRED_AUTH_STEPS: RegistrationProcessFinalizedStep[] = [
  'username',
  'referral',
  // 'email', TODO: temp email step disabling
  'iceBonus',
];

export const userIdSelector = (state: RootState) =>
  state.account.user?.id ?? '';

export const isAuthorizedSelector = (state: RootState) => !!state.account.user;

export const isAccountInitializedSelector = (state: RootState) =>
  state.account.isInitialized;

export const authTokenSelector = (state: RootState) => state.account.token;

export const userSelector = (state: RootState) => state.account.user;

export const isPhoneNumberVerifiedSelector = (state: RootState) =>
  state.account.user?.phoneNumber;

export const usernameSelector = (state: RootState) =>
  state.account.user?.username || '';

export const userInfoSelector = (state: RootState) => state.account.userInfo;

export const isAdminSelector = (state: RootState) => state.account.isAdmin;

export const isRegistrationCompleteSelector = (state: RootState) => {
  const user = userSelector(state);
  const isOnboardingViewed = isOnboardingViewedSelector(user?.id)(state);
  const registrationFinalizedSteps =
    user?.clientData?.registrationProcessFinalizedSteps ?? [];
  const isRequiredAuthStepsPassed =
    difference(REQUIRED_AUTH_STEPS, registrationFinalizedSteps).length === 0;
  return isRequiredAuthStepsPassed && isOnboardingViewed;
};
