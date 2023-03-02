// SPDX-License-Identifier: BUSL-1.1

import {RateAppActions} from '@store/modules/RateApp/actions';
import {RateAppSelectors} from '@store/modules/RateApp/selectors';
import {put, SagaReturnType, select} from 'redux-saga/effects';

const START_MINING_COUNT = 3;

export function* checkRateAppConditionSaga() {
  const isRateAppShown: SagaReturnType<typeof RateAppSelectors.isRateAppShown> =
    yield select(RateAppSelectors.isRateAppShown);

  const successStartMiningCount: SagaReturnType<
    typeof RateAppSelectors.getSuccessStartMiningCount
  > = yield select(RateAppSelectors.getSuccessStartMiningCount);

  if (!isRateAppShown && successStartMiningCount >= START_MINING_COUNT) {
    yield put(RateAppActions.SHOW_RATE_APP.START.create());
  }
}
