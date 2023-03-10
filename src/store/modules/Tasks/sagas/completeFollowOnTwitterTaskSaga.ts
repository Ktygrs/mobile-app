// SPDX-License-Identifier: BUSL-1.1

import {TasksActions} from '@store/modules/Tasks/actions';
import {taskByTypeSelector} from '@store/modules/Tasks/selectors';
import {put, select} from 'redux-saga/effects';

export function* completeFollowOnTwitterTaskSaga() {
  const task: ReturnType<ReturnType<typeof taskByTypeSelector>> = yield select(
    taskByTypeSelector({type: 'follow_us_on_twitter'}),
  );

  if (task && !task.completed) {
    yield put(
      TasksActions.TASK_MARK_COMPLETED.START.create({
        taskType: 'follow_us_on_twitter',
        data: {
          /** TODO: tasks: replace with real twitter username when twitter
           auth api will be connected */
          twitterUserHandle: 'x',
        },
      }),
    );
  }
}
