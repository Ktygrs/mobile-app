// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {TasksActions} from '@store/modules/Tasks/actions';
import {taskByTypeSelector} from '@store/modules/Tasks/selectors';
import {
  actionPayloadSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {checkProp} from '@utils/guards';
import {put, select} from 'redux-saga/effects';

export function* completeUploadProfileTaskSaga() {
  const task: ReturnType<ReturnType<typeof taskByTypeSelector>> = yield select(
    taskByTypeSelector({type: 'upload_profile_picture'}),
  );

  const isSuccessUpdate: ReturnType<typeof isSuccessSelector> = yield select(
    isSuccessSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const updatePayload: ReturnType<typeof actionPayloadSelector> = yield select(
    actionPayloadSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  if (isSuccessUpdate && checkProp(updatePayload, 'userInfo')) {
    const userInfo = updatePayload.userInfo as Partial<User>;
    if (userInfo.profilePicture && task && !task.completed) {
      yield put(TasksActions.COMPLETE_CURRENT_ACTIVE_TASK.STATE.create());
    }
  }
}
