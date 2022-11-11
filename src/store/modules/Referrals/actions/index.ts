// SPDX-License-Identifier: BUSL-1.1

import {ReferralHistoryRecord, Referrals} from '@api/referrals/types';
import {ReferralType} from '@api/user/types';
import {createAction} from '@store/utils/actions/createAction';

const GET_REFERRALS = ({
  userId,
  referralType = 'T1',
}: {
  userId?: string;
  referralType?: ReferralType;
}) =>
  createAction(
    'GET_REFERRALS',
    {
      START: ({offset}: {offset: number}) => ({
        userId,
        referralType,
        offset,
      }),
      SUCCESS: (uId: string, offset: number, result: Referrals) => ({
        userId: uId,
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

export const ReferralsActions = Object.freeze({
  GET_REFERRALS,
  GET_REFERRALS_HISTORY,
});
