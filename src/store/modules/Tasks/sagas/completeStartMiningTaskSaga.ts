// SPDX-License-Identifier: BUSL-1.1

import {TasksActions} from '@store/modules/Tasks/actions';
import {taskByTypeSelector} from '@store/modules/Tasks/selectors';
import {put, select} from 'redux-saga/effects';

export function* completeStartMiningTaskSaga() {
  const task: ReturnType<ReturnType<typeof taskByTypeSelector>> = yield select(
    taskByTypeSelector({type: 'start_mining'}),
  );

  if (task && !task.completed) {
    yield put(
      TasksActions.TASK_MARK_COMPLETED.START.create({type: 'start_mining'}),
    );
  }
}
