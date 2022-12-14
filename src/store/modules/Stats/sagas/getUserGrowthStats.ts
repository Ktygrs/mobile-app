// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {UserGrowth} from '@api/statistics/types';
import {UserGrowthStatsActions} from '@store/modules/Stats/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put} from 'redux-saga/effects';

const actionCreator = UserGrowthStatsActions.GET_USER_GROWTH_STATS.START.create;

export function* getUserGrowthStats(action: ReturnType<typeof actionCreator>) {
  const {statsPeriod} = action.payload;
  try {
    const userGrowth: UserGrowth = yield call(Api.statistics.getUserGrowth, {
      days: statsPeriod,
    });
    yield put(
      UserGrowthStatsActions.GET_USER_GROWTH_STATS.SUCCESS.create(
        statsPeriod,
        userGrowth,
      ),
    );
  } catch (error) {
    yield put(
      UserGrowthStatsActions.GET_USER_GROWTH_STATS.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
