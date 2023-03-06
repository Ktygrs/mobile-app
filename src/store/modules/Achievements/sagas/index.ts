// SPDX-License-Identifier: BUSL-1.1

import {AccountActions} from '@store/modules/Account/actions';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {completeInviteFriendsAchievementSaga} from '@store/modules/Achievements/sagas/completeInviteFriendsAchievementSaga';
import {completeNextAchievementSaga} from '@store/modules/Achievements/sagas/completeNextAchievementSaga';
import {completeStartMiningAchievementSaga} from '@store/modules/Achievements/sagas/completeStartMiningAchievementSaga';
import {completeUploadProfileAchievementSaga} from '@store/modules/Achievements/sagas/completeUploadProfileAchievementSaga';
import {loadAchievementsSaga} from '@store/modules/Achievements/sagas/loadAchievementsSaga';
import {ReferralsActions} from '@store/modules/Referrals/actions';
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
      AchievementsActions.COMPLETE_CURRENT_ACTIVE_ACHIEVEMENT.STATE.type,
      completeNextAchievementSaga,
    ),
    takeLeading(
      TokenomicsActions.START_MINING_SESSION.SUCCESS.type,
      completeStartMiningAchievementSaga,
    ),
    takeLeading(
      AccountActions.UPDATE_ACCOUNT.SUCCESS.type,
      completeUploadProfileAchievementSaga,
    ),
    takeLeading(
      ReferralsActions.GET_REFERRALS({referralType: 'T1'})('T1').START.type,
      completeInviteFriendsAchievementSaga,
    ),
  ]);
}
