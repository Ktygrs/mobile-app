// SPDX-License-Identifier: BUSL-1.1

import {AccountActions} from '@store/modules/Account/actions';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {getBalanceHistorySaga} from '@store/modules/Tokenomics/sagas/getBalanceHistory';
import {getBalanceSummarySaga} from '@store/modules/Tokenomics/sagas/getBalanceSummary';
import {getMiningSummarySaga} from '@store/modules/Tokenomics/sagas/getMiningSummary';
import {getPreStakingSummarySaga} from '@store/modules/Tokenomics/sagas/getPreStakingSummary';
import {getRankingSummarySaga} from '@store/modules/Tokenomics/sagas/getRankingSummary';
import {startMiningSessionSaga} from '@store/modules/Tokenomics/sagas/startMiningSession';
import {startOrUpdatePreStakingSaga} from '@store/modules/Tokenomics/sagas/startPreStaking';
import {all, takeLatest} from 'redux-saga/effects';

export function* rootTokenomicsSaga() {
  yield all([
    takeLatest(
      [
        AppCommonActions.APP_STATE_CHANGE.STATE.type,
        AppCommonActions.INTERVAL_UPDATE.STATE.type,
        AccountActions.USER_STATE_CHANGE.SUCCESS.type,
        TokenomicsActions.GET_MINING_SUMMARY.START.type,
        TokenomicsActions.START_OR_UPDATE_PRE_STAKING.SUCCESS.type,
      ],
      getMiningSummarySaga,
    ),
    takeLatest(
      [
        AppCommonActions.APP_STATE_CHANGE.STATE.type,
        AppCommonActions.INTERVAL_UPDATE.STATE.type,
        AccountActions.USER_STATE_CHANGE.SUCCESS.type,
        TokenomicsActions.GET_BALANCE_SUMMARY.START.type,
      ],
      getBalanceSummarySaga,
    ),
    takeLatest(
      [
        AccountActions.USER_STATE_CHANGE.SUCCESS.type,
        TokenomicsActions.GET_PRE_STAKING_SUMMARY.START.type,
      ],
      getPreStakingSummarySaga,
    ),
    takeLatest(
      [
        AppCommonActions.APP_STATE_CHANGE.STATE.type,
        AppCommonActions.INTERVAL_UPDATE.STATE.type,
        AccountActions.USER_STATE_CHANGE.SUCCESS.type,
        TokenomicsActions.GET_RANKING_SUMMARY.START.type,
      ],
      getRankingSummarySaga,
    ),
    takeLatest(
      TokenomicsActions.START_MINING_SESSION.START.type,
      startMiningSessionSaga,
    ),
    takeLatest(
      TokenomicsActions.START_OR_UPDATE_PRE_STAKING.START.type,
      startOrUpdatePreStakingSaga,
    ),
    takeLatest(
      TokenomicsActions.GET_BALANCE_HISTORY.START.type,
      getBalanceHistorySaga,
    ),
  ]);
}
