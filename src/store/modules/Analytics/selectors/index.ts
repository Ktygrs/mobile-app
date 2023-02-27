// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const referredBySelector = (state: RootState) =>
  state.analytics.referredBy;

export const authTrackedSelector = (state: RootState) =>
  state.analytics.authTracked;
