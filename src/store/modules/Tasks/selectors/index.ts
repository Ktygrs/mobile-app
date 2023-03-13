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

export const hasUncompletedTasksSelector = createSelector(
  tasksSelector,
  tasks => {
    return tasks.some(task => !task.completed);
  },
);

const getTasksAllCompletedBeforeTypeSelector = createSelector(
  [
    (state: RootState) => state.tasks.list,
    (_state: RootState, {type}: Options) => type,
  ],
  (tasks, type) => {
    const typeIndex = tasks.findIndex(task => task.type === type);
    const itemsBeforeType = tasks.slice(0, typeIndex);
    const allBeforeCompleted = itemsBeforeType.every(
      taskItem => taskItem.completed,
    );
    return allBeforeCompleted;
  },
);

export const tasksAllCompletedBeforeTypeSelector =
  (options: Options) => (state: RootState) =>
    getTasksAllCompletedBeforeTypeSelector(state, options);
