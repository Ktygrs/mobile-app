// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

import {rootSelector} from './rootSelector';

export const needAchievementsRefresh = (state: RootState) =>
  rootSelector(state).needRefresh;
