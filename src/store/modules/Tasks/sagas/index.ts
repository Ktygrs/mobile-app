// SPDX-License-Identifier: BUSL-1.1

import {AccountActions} from '@store/modules/Account/actions';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {TasksActions} from '@store/modules/Tasks/actions';
import {completeInviteFriendsTaskSaga} from '@store/modules/Tasks/sagas/completeInviteFriendsTaskSaga';
import {completeNextTaskSaga} from '@store/modules/Tasks/sagas/completeNextTaskSaga';
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
      TasksActions.COMPLETE_CURRENT_ACTIVE_TASK.STATE.type,
      completeNextTaskSaga,
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
      ReferralsActions.GET_REFERRALS({referralType: 'T1'})('T1').START.type,
      completeInviteFriendsTaskSaga,
    ),
  ]);
}
