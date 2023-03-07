// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {TasksActions} from '@store/modules/Tasks/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* loadTasksSaga() {
  try {
    const tasks: SagaReturnType<typeof Api.tasks.getTasks> = yield call(
      Api.tasks.getTasks,
    );
    yield put(TasksActions.GET_TASKS.SUCCESS.create({tasks}));
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    yield put(TasksActions.GET_TASKS.FAILED.create(errorMessage));

    throw error;
  }
}
