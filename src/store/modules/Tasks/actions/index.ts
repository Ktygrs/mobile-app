// SPDX-License-Identifier: BUSL-1.1

import {Task} from '@api/tasks/types';
import {createAction} from '@store/utils/actions/createAction';

const GET_TASKS = createAction('GET_TASKS', {
  START: () => {},
  SUCCESS: (payload: {tasks: Task[]}) => payload,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const TASK_MARK_COMPLETED = createAction('TASK_MARK_COMPLETED', {
  START: (payload: {name: string}) => payload,
});

const COMPLETE_CURRENT_ACTIVE_TASK = createAction(
  'COMPLETE_CURRENT_ACTIVE_TASK',
  {
    STATE: true,
  },
);

export const TasksActions = Object.freeze({
  GET_TASKS,
  TASK_MARK_COMPLETED,
  COMPLETE_CURRENT_ACTIVE_TASK,
});
