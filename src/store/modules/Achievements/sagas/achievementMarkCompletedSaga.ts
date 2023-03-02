// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator =
  AchievementsActions.ACHIEVEMENT_MARK_COMPLETED.START.create;

export function* achievementMarkCompletedSaga(
  action: ReturnType<typeof actionCreator>,
) {
  try {
    const {name} = action.payload;
    const updatedAchievements: SagaReturnType<
      typeof Api.achievements.completeAchievement
    > = yield call(Api.achievements.completeAchievement, {name});

    yield put(
      AchievementsActions.GET_ACHIEVEMENTS.SUCCESS.create({
        achievements: updatedAchievements,
      }),
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    yield put(AchievementsActions.GET_ACHIEVEMENTS.FAILED.create(errorMessage));

    throw error;
  }
}
