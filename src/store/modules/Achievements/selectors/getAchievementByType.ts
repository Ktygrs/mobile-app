// SPDX-License-Identifier: BUSL-1.1

import {AchievementType} from '@api/achievements/types';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/rootReducer';

import {rootSelector} from './rootSelector';

interface Options {
  type: AchievementType;
}

const selector = createSelector(
  [
    (state: RootState) => rootSelector(state).achievements,
    (_state: RootState, {type}: Options) => type,
  ],
  (achievements, type) => {
    return achievements.find(achievement => achievement.type === type);
  },
);

export const getAchievementByType = (options: Options) => (state: RootState) =>
  selector(state, options);
