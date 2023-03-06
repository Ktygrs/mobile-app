// SPDX-License-Identifier: BUSL-1.1

import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getAchievements} from '@store/modules/Achievements/selectors/getAchievements';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {put, select} from 'redux-saga/effects';

export function* completeInviteFriendsAchievementSaga() {
  const achievements: ReturnType<typeof getAchievements> = yield select(
    getAchievements,
  );

  const {total} = yield select(referralsSelector({referralType: 'T1'}));

  const inviteFriendsAchievement = achievements.find(
    achievement => achievement.type === 'invite_friends',
  );

  const requiredInvitesCount = inviteFriendsAchievement?.data?.requiredQuantity;
  if (
    inviteFriendsAchievement &&
    !inviteFriendsAchievement.completed &&
    requiredInvitesCount &&
    total - 1 >= requiredInvitesCount
  ) {
    // TODO: achievements: replace with API call when api would be connected
    yield put(
      AchievementsActions.COMPLETE_CURRENT_ACTIVE_ACHIEVEMENT.STATE.create(),
    );
  }
}
