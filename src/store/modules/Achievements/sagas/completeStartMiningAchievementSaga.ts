// SPDX-License-Identifier: BUSL-1.1

import {getAchievements} from '@store/modules/Achievements/selectors/getAchievements';
import {select} from 'redux-saga/effects';

export function* completeStartMiningAchievementSaga() {
  const achievements: ReturnType<typeof getAchievements> = yield select(
    getAchievements,
  );

  console.log(achievements);

  //   const miningAchievement = achievements.find(
  //     achievement => achievement.type === 'start_mining',
  //   );
  //   if (hasUncompleted && miningAchievement && !miningAchievement.completed) {
  //    //dispatch achievement complete
  //   }
}
