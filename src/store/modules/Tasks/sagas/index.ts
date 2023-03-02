// SPDX-License-Identifier: BUSL-1.1

import {TasksActions} from '@store/modules/Tasks/actions';
import {all, takeLeading} from 'redux-saga/effects';

import {loadTasksSaga} from './loadTasksSaga';
import {taskMarkCompletedSaga} from './taskMarkCompletedSaga';

export function* rootTasksSaga() {
  yield all([
    takeLeading(TasksActions.TASKS_LOAD.START.type, loadTasksSaga),
    takeLeading(
      TasksActions.TASK_MARK_COMPLETED.START.type,
      taskMarkCompletedSaga,
    ),
  ]);
}
