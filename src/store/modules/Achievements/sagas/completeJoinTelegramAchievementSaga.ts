// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getAchievements} from '@store/modules/Achievements/selectors/getAchievements';
import {hasUncompletedAchievements} from '@store/modules/Achievements/selectors/hasUncompletedAchievements';
import {
  actionPayloadSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {checkProp} from '@utils/guards';
import {put, select} from 'redux-saga/effects';

export function* completeJoinTelegramAchievementSaga() {
  const achievements: ReturnType<typeof getAchievements> = yield select(
    getAchievements,
  );

  const isSuccessUpdate: ReturnType<typeof isSuccessSelector> = yield select(
    isSuccessSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const updatePayload: ReturnType<typeof actionPayloadSelector> = yield select(
    actionPayloadSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  if (isSuccessUpdate && checkProp(updatePayload, 'user')) {
    const hasUncompleted: ReturnType<typeof hasUncompletedAchievements> =
      yield select(hasUncompletedAchievements);

    const joinTelegramAchievement = achievements.find(
      achievement => achievement.type === 'join_telegram',
    );

    const user = updatePayload.user as Partial<User>;

    if (
      user.clientData?.telegramUserHandle &&
      hasUncompleted &&
      joinTelegramAchievement &&
      !joinTelegramAchievement.completed
    ) {
      // TODO: achievements: replace with API call when api would be connected
      yield put(AchievementsActions.COMPLETE_NEXT_ACHIEVEMENT.STATE.create());
    }
  }
}
