// SPDX-License-Identifier: BUSL-1.1

import {Task} from '@api/tasks/types';
import {createAction} from '@store/utils/actions/createAction';

const TASKS_LOAD = createAction('TASKS_LOAD', {
  START: () => {},
  SUCCESS: (payload: {tasks: Task[]}) => payload,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const TASK_MARK_COMPLETED = createAction('TASK_MARK_COMPLETED', {
  START: (payload: {name: string}) => payload,
});

export const TasksActions = Object.freeze({
  TASKS_LOAD,
  TASK_MARK_COMPLETED,
});
