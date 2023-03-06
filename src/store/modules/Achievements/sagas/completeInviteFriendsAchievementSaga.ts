// SPDX-License-Identifier: BUSL-1.1

import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getAchievementByType} from '@store/modules/Achievements/selectors/getAchievementByType';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {put, select} from 'redux-saga/effects';

export function* completeInviteFriendsAchievementSaga() {
  const achievement: ReturnType<ReturnType<typeof getAchievementByType>> =
    yield select(getAchievementByType({type: 'invite_friends'}));

  const {total} = yield select(referralsSelector({referralType: 'T1'}));

  const requiredInvitesCount = achievement?.data?.requiredQuantity;
  if (
    achievement &&
    !achievement.completed &&
    requiredInvitesCount &&
    total - 1 >= requiredInvitesCount
  ) {
    // TODO: achievements: replace with API call when api would be connected
    yield put(
      AchievementsActions.COMPLETE_CURRENT_ACTIVE_ACHIEVEMENT.STATE.create(),
    );
  }
}
