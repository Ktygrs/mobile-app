// SPDX-License-Identifier: BUSL-1.1

import {UserGrowthStatsActions} from '@store/modules/Stats/actions';
import {getUserGrowthStats} from '@store/modules/Stats/sagas/getUserGrowthStats';
import {all, takeLatest} from 'redux-saga/effects';

export function* rootStatsSaga() {
  yield all([
    takeLatest(
      UserGrowthStatsActions.GET_USER_GROWTH_STATS.START.type,
      getUserGrowthStats,
    ),
  ]);
}
