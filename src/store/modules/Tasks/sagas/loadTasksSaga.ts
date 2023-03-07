// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Account/selectors';
import {TasksActions} from '@store/modules/Tasks/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* loadTasksSaga() {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );
  try {
    const tasks: SagaReturnType<typeof Api.tasks.getTasks> = yield call(
      Api.tasks.getTasks,
      userId,
    );
    yield put(TasksActions.GET_TASKS.SUCCESS.create({tasks}));
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    yield put(TasksActions.GET_TASKS.FAILED.create(errorMessage));

    throw error;
  }
}
