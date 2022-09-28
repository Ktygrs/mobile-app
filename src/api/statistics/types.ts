// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';

export interface CountryStatistics {
  country: string;
  userCount: number;
}

export interface Miner extends User {
  iceAmount: string;
}
