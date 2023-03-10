// SPDX-License-Identifier: BUSL-1.1

import {AccountActions} from '@store/modules/Account/actions';
import {TasksActions} from '@store/modules/Tasks/actions';
import {completeFollowOnTwitterTaskSaga} from '@store/modules/Tasks/sagas/completeFollowOnTwitterTaskSaga';
import {completeInviteFriendsTaskSaga} from '@store/modules/Tasks/sagas/completeInviteFriendsTaskSaga';
import {completeJoinTelegramTaskSaga} from '@store/modules/Tasks/sagas/completeJoinTelegramTaskSaga';
import {completeStartMiningTaskSaga} from '@store/modules/Tasks/sagas/completeStartMiningTaskSaga';
import {completeUploadProfileTaskSaga} from '@store/modules/Tasks/sagas/completeUploadProfileTaskSaga';
import {loadTasksSaga} from '@store/modules/Tasks/sagas/loadTasksSaga';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {all, takeLeading} from 'redux-saga/effects';

import {taskMarkCompletedSaga} from './taskMarkCompletedSaga';

export function* rootTasksSaga() {
  yield all([
    takeLeading(TasksActions.GET_TASKS.START.type, loadTasksSaga),
    takeLeading(
      TasksActions.TASK_MARK_COMPLETED.START.type,
      taskMarkCompletedSaga,
    ),
    takeLeading(
      TokenomicsActions.START_MINING_SESSION.SUCCESS.type,
      completeStartMiningTaskSaga,
    ),
    takeLeading(
      AccountActions.UPDATE_ACCOUNT.SUCCESS.type,
      completeUploadProfileTaskSaga,
    ),
    takeLeading(
      AccountActions.GET_ACCOUNT.SUCCESS.type,
      completeInviteFriendsTaskSaga,
    ),
    takeLeading(
      TasksActions.TWITTER_MARK_COMPLETED.STATE.type,
      completeFollowOnTwitterTaskSaga,
    ),
    takeLeading(
      TasksActions.TELEGRAM_MARK_COMPLETED.STATE.type,
      completeJoinTelegramTaskSaga,
    ),
  ]);
}
