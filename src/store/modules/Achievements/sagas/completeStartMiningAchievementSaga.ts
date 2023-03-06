// SPDX-License-Identifier: BUSL-1.1

import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getAchievementByType} from '@store/modules/Achievements/selectors/getAchievementByType';
import {put, select} from 'redux-saga/effects';

export function* completeStartMiningAchievementSaga() {
  const achievement: ReturnType<ReturnType<typeof getAchievementByType>> =
    yield select(getAchievementByType({type: 'start_mining'}));

  if (achievement && !achievement.completed) {
    yield put(
      AchievementsActions.COMPLETE_CURRENT_ACTIVE_ACHIEVEMENT.STATE.create(),
    );
  }
}
