// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getAchievements} from '@store/modules/Achievements/selectors/getAchievements';
import {
  actionPayloadSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {checkProp} from '@utils/guards';
import {put, select} from 'redux-saga/effects';

export function* completeUploadProfileAchievementSaga() {
  const achievements: ReturnType<typeof getAchievements> = yield select(
    getAchievements,
  );

  const isSuccessUpdate: ReturnType<typeof isSuccessSelector> = yield select(
    isSuccessSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const updatePayload: ReturnType<typeof actionPayloadSelector> = yield select(
    actionPayloadSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  if (isSuccessUpdate && checkProp(updatePayload, 'userInfo')) {
    const miningAchievement = achievements.find(
      achievement => achievement.type === 'upload_profile_picture',
    );

    const userInfo = updatePayload.userInfo as Partial<User>;
    if (
      userInfo.profilePicture &&
      miningAchievement &&
      !miningAchievement.completed
    ) {
      yield put(
        AchievementsActions.COMPLETE_CURRENT_ACTIVE_ACHIEVEMENT.STATE.create(),
      );
    }
  }
}
