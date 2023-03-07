// SPDX-License-Identifier: BUSL-1.1

import {TaskType} from '@api/tasks/types';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/rootReducer';

interface Options {
  type: TaskType;
}

const getTaskByTypeSelector = createSelector(
  [
    (state: RootState) => state.tasks.list,
    (_state: RootState, {type}: Options) => type,
  ],
  (tasks, type) => {
    return tasks.find(task => task.type === type);
  },
);

export const taskByTypeSelector = (options: Options) => (state: RootState) =>
  getTaskByTypeSelector(state, options);

export const tasksSelector = (state: RootState) => state.tasks.list;

export const hasUncompletedTasksSelector = (state: RootState) => {
  return !!state.tasks.list.find(task => !task.completed);
};
