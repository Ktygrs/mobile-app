// SPDX-License-Identifier: BUSL-1.1

import {ReferralType} from '@api/user/types';
import {createSelector} from '@reduxjs/toolkit';
import {userIdSelector} from '@store/modules/Account/selectors';
import {RootState} from '@store/rootReducer';

interface ReferralSelectorOptions {
  userId?: string;
  referralType: ReferralType;
}

const referralsSelectorWithMemo = createSelector(
  [
    (state: RootState) => state.referrals,
    (state: RootState, {userId}: ReferralSelectorOptions) =>
      userId ?? userIdSelector(state),
    (_state: RootState, {referralType}: ReferralSelectorOptions) =>
      referralType,
  ],
  (referrals, userId, referralType) => {
    const referralData = referrals.data[userId]?.[referralType];
    return {
      data: referralData?.referrals ?? [],
      hasNext:
        !referralData || referralData.total > referralData.referrals.length,
      total: referralData?.total,
      active: referralData?.active,
    };
  },
);

export const referralsSelector =
  (options: ReferralSelectorOptions) => (state: RootState) =>
    referralsSelectorWithMemo(state, options);

export const referralHistorySelector = (state: RootState) =>
  state.referrals.history;

export const userReferralCountSelector = (state: RootState) =>
  (state.account.user?.t1ReferralCount || 0) +
  (state.account.user?.t2ReferralCount || 0);

export const userT1ReferralSelector = (state: RootState) =>
  state.account.user?.t1ReferralCount || 0;

export const userT2ReferralSelector = (state: RootState) =>
  state.account.user?.t2ReferralCount || 0;
