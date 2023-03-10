// SPDX-License-Identifier: BUSL-1.1

import {userSelector} from '@store/modules/Account/selectors';
import {TasksActions} from '@store/modules/Tasks/actions';
import {taskByTypeSelector} from '@store/modules/Tasks/selectors';
import {put, select} from 'redux-saga/effects';

export function* completeInviteFriendsTaskSaga() {
  const task: ReturnType<ReturnType<typeof taskByTypeSelector>> = yield select(
    taskByTypeSelector({type: 'invite_friends'}),
  );

  const user: ReturnType<typeof userSelector> = yield select(userSelector);

  const requiredInvitesCount = task?.data?.requiredQuantity;
  if (
    task &&
    !task.completed &&
    requiredInvitesCount &&
    user?.t1ReferralCount &&
    user?.t1ReferralCount >= requiredInvitesCount
  ) {
    yield put(
      TasksActions.TASK_MARK_COMPLETED.START.create({
        type: 'invite_friends',
      }),
    );
  }
}
