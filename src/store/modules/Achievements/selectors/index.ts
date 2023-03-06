// SPDX-License-Identifier: BUSL-1.1

import {getAchievementByType} from './getAchievementByType';
import {getAchievements} from './getAchievements';
import {hasUncompletedAchievements} from './hasUncompletedAchievements';

export const AchievementsSelectors = Object.freeze({
  getAchievements,
  hasUncompletedAchievements,
  getAchievementByType,
});
