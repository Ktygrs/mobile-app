// SPDX-License-Identifier: BUSL-1.1

import {ReferralHistoryRecord, Referrals} from '@api/referrals/types';
import {ReferralType} from '@api/user/types';
import {createAction} from '@store/utils/actions/createAction';

const GET_REFERRALS = ({referralType = 'T1'}: {referralType?: ReferralType}) =>
  createAction(
    'GET_REFERRALS',
    {
      START: ({offset = 0}: {offset?: number} = {}) => ({
        referralType,
        offset,
      }),
      SUCCESS: (offset: number, result: Referrals) => ({
        referralType,
        offset,
        result,
      }),
      FAILED: (errorMessage: string) => ({
        errorMessage,
      }),
    },
    {isMultiInstanceProcess: true},
  );

const GET_REFERRALS_HISTORY = createAction('GET_REFERRALS_HISTORY', {
  START: () => {},
  SUCCESS: (history: ReferralHistoryRecord[]) => ({history}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const PING_REFERRAL = createAction(
  'REFERRALS/PING_REFERRAL',
  {
    START: (payload: {userId: string}) => payload,
    SUCCESS: (payload: {userId: string}) => payload,
    FAILED: (payload: {userId: string; errorMessage: string}) => payload,
  },
  {
    isMultiInstanceProcess: true,
  },
);

export const ReferralsActions = Object.freeze({
  GET_REFERRALS,
  GET_REFERRALS_HISTORY,
  PING_REFERRAL,
});
