// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* loadAchievementsSaga() {
  try {
    const achievements: SagaReturnType<
      typeof Api.achievements.getAchievements
    > = yield call(Api.achievements.getAchievements);
    yield put(
      AchievementsActions.GET_ACHIEVEMENTS.SUCCESS.create({achievements}),
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    yield put(AchievementsActions.GET_ACHIEVEMENTS.FAILED.create(errorMessage));

    throw error;
  }
}
