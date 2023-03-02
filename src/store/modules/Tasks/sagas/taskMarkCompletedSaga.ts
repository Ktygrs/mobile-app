// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {TasksActions} from '@store/modules/Tasks/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = TasksActions.TASK_MARK_COMPLETED.START.create;

export function* taskMarkCompletedSaga(
  action: ReturnType<typeof actionCreator>,
) {
  try {
    const {name} = action.payload;
    const updatedTasks: SagaReturnType<typeof Api.tasks.completeTask> =
      yield call(Api.tasks.completeTask, {name});

    yield put(TasksActions.TASKS_LOAD.SUCCESS.create({tasks: updatedTasks}));
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    yield put(TasksActions.TASKS_LOAD.FAILED.create(errorMessage));

    throw error;
  }
}
