// SPDX-License-Identifier: BUSL-1.1

import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getAchievements} from '@store/modules/Achievements/selectors/getAchievements';
import {hasUncompletedAchievements} from '@store/modules/Achievements/selectors/hasUncompletedAchievements';
import {put, select} from 'redux-saga/effects';

export function* completeStartMiningAchievementSaga() {
  const achievements: ReturnType<typeof getAchievements> = yield select(
    getAchievements,
  );

  const hasUncompleted: ReturnType<typeof hasUncompletedAchievements> =
    yield select(hasUncompletedAchievements);

  const miningAchievement = achievements.find(
    achievement => achievement.type === 'start_mining',
  );

  if (hasUncompleted && miningAchievement && !miningAchievement.completed) {
    yield put(AchievementsActions.COMPLETE_NEXT_ACHIEVEMENT.STATE.create());
  }
}
