// SPDX-License-Identifier: BUSL-1.1

import {AchievementsActions} from '@store/modules/Achievements/actions';
import {loadAchievementsSaga} from '@store/modules/Achievements/sagas/loadAchievementsSaga';
import {all, takeLeading} from 'redux-saga/effects';

import {achievementMarkCompletedSaga} from './achievementMarkCompletedSaga';

export function* rootTasksSaga() {
  yield all([
    takeLeading(
      AchievementsActions.ACHIEVEMENTS_LOAD.START.type,
      loadAchievementsSaga,
    ),
    takeLeading(
      AchievementsActions.ACHIEVEMENT_MARK_COMPLETED.START.type,
      achievementMarkCompletedSaga,
    ),
  ]);
}
