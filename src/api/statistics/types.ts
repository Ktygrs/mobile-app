// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';

export interface CountryStatistics {
  country: string;
  userCount: number;
}

export interface Miner extends User {
  iceAmount: string;
}

export interface UserGrowth {
  active: number; //  0,
  total: number; // 20
  timeSeries: TimeSeries[];
}

export interface TimeSeries {
  date: string; // "2022-11-30T16:35:02.996090946Z",
  active: number; // 0,
  total: number; // 20
}
