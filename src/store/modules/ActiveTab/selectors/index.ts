// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const activeTabSelector = (state: RootState) =>
  state.activeTab.activeTab;
