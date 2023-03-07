// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getAchievementByType} from '@store/modules/Achievements/selectors/getAchievementByType';
import {
  actionPayloadSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {checkProp} from '@utils/guards';
import {put, select} from 'redux-saga/effects';

export function* completeJoinTelegramAchievementSaga() {
  const achievement: ReturnType<ReturnType<typeof getAchievementByType>> =
    yield select(getAchievementByType({type: 'join_telegram'}));

  const isSuccessUpdate: ReturnType<typeof isSuccessSelector> = yield select(
    isSuccessSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const updatePayload: ReturnType<typeof actionPayloadSelector> = yield select(
    actionPayloadSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  if (isSuccessUpdate && checkProp(updatePayload, 'userInfo')) {
    const user = updatePayload.userInfo as Partial<User>;

    if (
      user.clientData?.telegramUserHandle &&
      achievement &&
      !achievement.completed
    ) {
      // TODO: achievements: replace with API call when api would be connected
      yield put(
        AchievementsActions.COMPLETE_CURRENT_ACTIVE_ACHIEVEMENT.STATE.create(),
      );
    }
  }
}