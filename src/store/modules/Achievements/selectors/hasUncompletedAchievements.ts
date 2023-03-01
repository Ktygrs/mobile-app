// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

import {rootSelector} from './rootSelector';

export const hasUncompletedAchievements = (state: RootState) => {
  return !!rootSelector(state).achievements.find(
    achievement => !achievement.completed,
  );
};
