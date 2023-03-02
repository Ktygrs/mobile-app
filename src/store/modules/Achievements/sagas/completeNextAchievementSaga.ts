// SPDX-License-Identifier: BUSL-1.1

import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getAchievements} from '@store/modules/Achievements/selectors/getAchievements';
import {put, select} from 'redux-saga/effects';

export function* completeNextAchievementSaga() {
  const achievements: ReturnType<typeof getAchievements> = yield select(
    getAchievements,
  );

  const firstIncompleteIndex = achievements.findIndex(
    achievement => !achievement.completed,
  );

  if (firstIncompleteIndex !== -1) {
    const updatedAchievements = [...achievements].map((item, index) => {
      if (index === firstIncompleteIndex) {
        return Object.assign({}, item, {completed: true});
      }
      return item;
    });

    // TODO: achievements: replace with API call when api would be connected
    yield put(
      AchievementsActions.GET_ACHIEVEMENTS.SUCCESS.create({
        achievements: updatedAchievements,
      }),
    );
  }
}
