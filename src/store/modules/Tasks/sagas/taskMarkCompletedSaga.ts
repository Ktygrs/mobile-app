// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {TasksActions} from '@store/modules/Tasks/actions';
import {tasksSelector} from '@store/modules/Tasks/selectors';
import {getErrorMessage} from '@utils/errors';
import {call, put, select} from 'redux-saga/effects';

const actionCreator = TasksActions.TASK_MARK_COMPLETED.START.create;

export function* taskMarkCompletedSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );
  const tasks: ReturnType<typeof tasksSelector> = yield select(tasksSelector);

  try {
    const {taskType, data} = action.payload;

    yield call(Api.tasks.completeTask, {taskType, userId, data});

    const updatedTasks = [...tasks].map(item => {
      if (item.type === taskType) {
        return Object.assign({}, item, {completed: true});
      }
      return item;
    });

    yield put(
      TasksActions.GET_TASKS.SUCCESS.create({
        tasks: updatedTasks,
      }),
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    yield put(TasksActions.GET_TASKS.FAILED.create(errorMessage));

    throw error;
  }
}
