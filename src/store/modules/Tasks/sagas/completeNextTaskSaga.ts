// SPDX-License-Identifier: BUSL-1.1

import {TasksActions} from '@store/modules/Tasks/actions';
import {tasksSelector} from '@store/modules/Tasks/selectors';
import {put, select} from 'redux-saga/effects';

export function* completeNextTaskSaga() {
  const tasks: ReturnType<typeof tasksSelector> = yield select(tasksSelector);

  const firstIncompleteIndex = tasks.findIndex(task => !task.completed);

  if (firstIncompleteIndex !== -1) {
    const updatedTasks = [...tasks].map((item, index) => {
      if (index === firstIncompleteIndex) {
        return Object.assign({}, item, {completed: true});
      }
      return item;
    });

    // TODO: tasks: replace with API call when api would be connected
    yield put(
      TasksActions.GET_TASKS.SUCCESS.create({
        tasks: updatedTasks,
      }),
    );
  }
}
