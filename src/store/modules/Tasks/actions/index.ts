// SPDX-License-Identifier: BUSL-1.1

import {Task, TaskData, TaskType} from '@api/tasks/types';
import {createAction} from '@store/utils/actions/createAction';

const GET_TASKS = createAction('GET_TASKS', {
  START: () => {},
  SUCCESS: (payload: {tasks: Task[]}) => payload,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const TASK_MARK_COMPLETED = createAction('TASK_MARK_COMPLETED', {
  START: (payload: {taskType: TaskType; data?: TaskData}) => payload,
});

const TWITTER_MARK_COMPLETED = createAction('TWITTER_MARK_COMPLETED', {
  STATE: true,
});

const TELEGRAM_MARK_COMPLETED = createAction('TELEGRAM_MARK_COMPLETED', {
  STATE: (payload: {telegramUserHandle: string}) => payload,
});

export const TasksActions = Object.freeze({
  GET_TASKS,
  TASK_MARK_COMPLETED,
  TWITTER_MARK_COMPLETED,
  TELEGRAM_MARK_COMPLETED,
});
