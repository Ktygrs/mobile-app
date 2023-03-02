// SPDX-License-Identifier: BUSL-1.1

import {AchievementsActions} from '@store/modules/Achievements/actions';
import {completeNextAchievementSaga} from '@store/modules/Achievements/sagas/completeNextAchievementSaga';
import {completeStartMiningAchievementSaga} from '@store/modules/Achievements/sagas/completeStartMiningAchievementSaga';
import {loadAchievementsSaga} from '@store/modules/Achievements/sagas/loadAchievementsSaga';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {all, takeLeading} from 'redux-saga/effects';

import {achievementMarkCompletedSaga} from './achievementMarkCompletedSaga';

export function* rootAchievementsSaga() {
  yield all([
    takeLeading(
      AchievementsActions.GET_ACHIEVEMENTS.START.type,
      loadAchievementsSaga,
    ),
    takeLeading(
      AchievementsActions.ACHIEVEMENT_MARK_COMPLETED.START.type,
      achievementMarkCompletedSaga,
    ),
    takeLeading(
      AchievementsActions.COMPLETE_NEXT_ACHIEVEMENT.STATE.type,
      completeNextAchievementSaga,
    ),
    takeLeading(
      TokenomicsActions.START_MINING_SESSION.SUCCESS.type,
      completeStartMiningAchievementSaga,
    ),
  ]);
}
