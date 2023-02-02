// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {UserGrowth} from '@api/statistics/types';
import {StatsActions} from '@store/modules/Stats/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put} from 'redux-saga/effects';

export function* getUserGrowthStats(
  action: ReturnType<typeof StatsActions.GET_USER_GROWTH_STATS.START.create>,
) {
  const {statsPeriod} = action.payload;
  try {
    const userGrowth: UserGrowth = yield call(Api.statistics.getUserGrowth, {
      days: statsPeriod,
    });
    yield put(
      StatsActions.GET_USER_GROWTH_STATS.SUCCESS.create(
        statsPeriod,
        userGrowth,
      ),
    );
  } catch (error) {
    yield put(
      StatsActions.GET_USER_GROWTH_STATS.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
