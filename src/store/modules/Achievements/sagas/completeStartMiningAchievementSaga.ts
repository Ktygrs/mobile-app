// SPDX-License-Identifier: BUSL-1.1

import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getAchievements} from '@store/modules/Achievements/selectors/getAchievements';
import {put, select} from 'redux-saga/effects';

export function* completeStartMiningAchievementSaga() {
  const achievements: ReturnType<typeof getAchievements> = yield select(
    getAchievements,
  );

  const miningAchievement = achievements.find(
    achievement => achievement.type === 'start_mining',
  );

  if (miningAchievement && !miningAchievement.completed) {
    yield put(
      AchievementsActions.COMPLETE_CURRENT_ACTIVE_ACHIEVEMENT.STATE.create(),
    );
  }
}
