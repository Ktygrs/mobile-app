// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';

export type Referrals = {
  active: number;
  referrals: User[];
  total: number;
};

export type ReferralHistoryRecord = {
  date: string;
  t1: number;
  t2: number;
};
