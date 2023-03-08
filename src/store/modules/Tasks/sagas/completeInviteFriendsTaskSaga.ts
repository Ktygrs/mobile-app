// SPDX-License-Identifier: BUSL-1.1

import {referralsSelector} from '@store/modules/Referrals/selectors';
import {TasksActions} from '@store/modules/Tasks/actions';
import {taskByTypeSelector} from '@store/modules/Tasks/selectors';
import {put, select} from 'redux-saga/effects';

export function* completeInviteFriendsTaskSaga() {
  const task: ReturnType<ReturnType<typeof taskByTypeSelector>> = yield select(
    taskByTypeSelector({type: 'invite_friends'}),
  );

  const {total} = yield select(referralsSelector({referralType: 'T1'}));

  const requiredInvitesCount = task?.data?.requiredQuantity;
  if (
    task &&
    !task.completed &&
    requiredInvitesCount &&
    total >= requiredInvitesCount
  ) {
    // TODO: tasks: replace with API call when api would be connected
    yield put(TasksActions.COMPLETE_CURRENT_ACTIVE_TASK.STATE.create());
  }
}