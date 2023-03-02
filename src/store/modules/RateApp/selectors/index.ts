// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

const getSuccessStartMiningCount = (state: RootState) =>
  state.rateApp.successStartMiningCount;

const isRateAppShown = (state: RootState) => state.rateApp.isRateAppShown;

export const RateAppSelectors = Object.freeze({
  getSuccessStartMiningCount,
  isRateAppShown,
});
