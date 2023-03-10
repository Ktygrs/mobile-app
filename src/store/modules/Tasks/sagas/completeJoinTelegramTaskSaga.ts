// SPDX-License-Identifier: BUSL-1.1

import {TasksActions} from '@store/modules/Tasks/actions';
import {taskByTypeSelector} from '@store/modules/Tasks/selectors';
import {put, select} from 'redux-saga/effects';

const actionCreator = TasksActions.TELEGRAM_MARK_COMPLETED.STATE.create;

export function* completeJoinTelegramTaskSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const task: ReturnType<ReturnType<typeof taskByTypeSelector>> = yield select(
    taskByTypeSelector({type: 'join_telegram'}),
  );

  const {telegramUserHandle} = action.payload;

  if (task && !task.completed) {
    yield put(
      TasksActions.TASK_MARK_COMPLETED.START.create({
        type: 'join_telegram',
        data: {
          telegramUserHandle,
        },
      }),
    );
  }
}
