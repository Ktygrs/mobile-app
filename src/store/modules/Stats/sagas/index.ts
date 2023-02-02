// SPDX-License-Identifier: BUSL-1.1

import {AccountActions} from '@store/modules/Account/actions';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {StatsActions} from '@store/modules/Stats/actions';
import {getAdoptionSaga} from '@store/modules/Stats/sagas/getAdoption';
import {getUserGrowthStats} from '@store/modules/Stats/sagas/getUserGrowthStats';
import {all, takeLatest} from 'redux-saga/effects';

export function* rootStatsSaga() {
  yield all([
    takeLatest(
      StatsActions.GET_USER_GROWTH_STATS.START.type,
      getUserGrowthStats,
    ),
    takeLatest(
      [
        AppCommonActions.APP_STATE_CHANGE.STATE.type,
        AppCommonActions.INTERVAL_UPDATE.STATE.type,
        AccountActions.USER_STATE_CHANGE.SUCCESS.type,
        StatsActions.GET_ADOPTION.START.type,
      ],
      getAdoptionSaga,
    ),
  ]);
}
