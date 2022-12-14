// SPDX-License-Identifier: BUSL-1.1

import {TimeSeries} from '@api/statistics/types';
import {UserGrowthStatsActions} from '@store/modules/Stats/actions';
import produce from 'immer';

export interface UserGrowthStatsState {
  timeSeriesStatsMap: {[key: number]: TimeSeries[]};
  active: number;
  total: number;
}

type Actions = ReturnType<
  | typeof UserGrowthStatsActions.GET_USER_GROWTH_STATS.START.create
  | typeof UserGrowthStatsActions.GET_USER_GROWTH_STATS.SUCCESS.create
  | typeof UserGrowthStatsActions.GET_USER_GROWTH_STATS.FAILED.create
>;

const INITIAL_STATE: UserGrowthStatsState = {
  timeSeriesStatsMap: {},
  active: 0,
  total: 0,
};

function reducer(state = INITIAL_STATE, action: Actions): UserGrowthStatsState {
  return produce(state, draft => {
    switch (action.type) {
      case UserGrowthStatsActions.GET_USER_GROWTH_STATS.SUCCESS.type: {
        const {statsPeriod, userGrowth} = action.payload;
        draft.timeSeriesStatsMap[statsPeriod] = userGrowth.timeSeries;
        draft.active = userGrowth.active;
        draft.total = userGrowth.total;
        break;
      }
    }
  });
}

export const statsReducer = reducer;
