// SPDX-License-Identifier: BUSL-1.1

import {TimeSeries} from '@api/statistics/types';
import {StatsPeriod} from '@store/modules/Stats/types';
import {RootState} from '@store/rootReducer';

export const getUserGrowthStatsSelector =
  (period: StatsPeriod) =>
  (state: RootState): TimeSeries[] => {
    return state.stats.timeSeriesStatsMap[period] ?? [];
  };

export const totalActiveUsersSelector = (state: RootState): number =>
  state.stats.active;

export const totalUsersSelector = (state: RootState): number =>
  state.stats.total;
