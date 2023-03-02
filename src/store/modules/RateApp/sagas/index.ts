// SPDX-License-Identifier: BUSL-1.1

import {RateAppActions} from '@store/modules/RateApp/actions';
import {checkRateAppConditionSaga} from '@store/modules/RateApp/sagas/checkRateAppConditionSaga';
import {showRateAppSaga} from '@store/modules/RateApp/sagas/showRateAppSaga';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {all, takeLatest, takeLeading} from 'redux-saga/effects';

export function* rootRateAppSaga() {
  yield all([
    takeLatest(
      TokenomicsActions.START_MINING_SESSION.SUCCESS.type,
      checkRateAppConditionSaga,
    ),
    takeLeading(RateAppActions.SHOW_RATE_APP.START.type, showRateAppSaga),
  ]);
}
