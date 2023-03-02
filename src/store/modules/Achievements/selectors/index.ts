// SPDX-License-Identifier: BUSL-1.1

import {getAchievements} from './getAchievements';
import {hasUncompletedAchievements} from './hasUncompletedAchievements';
import {needAchievementsRefresh} from './needAchievementsRefresh';

export const AchievementsSelectors = Object.freeze({
  getAchievements,
  hasUncompletedAchievements,
  needAchievementsRefresh,
});
