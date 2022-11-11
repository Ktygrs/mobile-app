// SPDX-License-Identifier: BUSL-1.1

import {ReferralType} from '@api/user/types';
import {userIdSelector} from '@store/modules/Account/selectors';
import {RootState} from '@store/rootReducer';

export const referralsSelector =
  ({
    userId,
    referralType = 'T1',
  }: {
    userId?: string;
    referralType: ReferralType;
  }) =>
  (state: RootState) => {
    const uId = userId ?? userIdSelector(state);
    const referralData = state.referrals.data[uId]?.[referralType];
    return {
      data: referralData?.referrals ?? [],
      hasNext:
        !referralData || referralData.total > referralData.referrals.length,
      total: referralData?.total,
      active: referralData?.active,
    };
  };
