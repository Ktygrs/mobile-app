// SPDX-License-Identifier: BUSL-1.1

import {TimeSeries} from '@api/statistics/types';
import {StatsPeriod} from '@store/modules/Stats/types';
import {RootState} from '@store/rootReducer';

export const getUserGrowthStatsSelector =
  (period: StatsPeriod) =>
  (state: RootState): TimeSeries[] => {
    return state.stats.userGrowth.timeSeriesStatsMap[period] ?? [];
  };

export const totalActiveUsersSelector = (state: RootState) =>
  state.stats.userGrowth.active;

export const totalUsersSelector = (state: RootState) =>
  state.stats.userGrowth.total;

export const adoptionSelector = (state: RootState) => state.stats.adoption;
