// SPDX-License-Identifier: BUSL-1.1

import {Task} from '@api/tasks/types';
import {TasksActions} from '@store/modules/Tasks/actions';
import produce from 'immer';

export interface State {
  tasks: Task[];
}

type Actions = ReturnType<typeof TasksActions.TASKS_LOAD.SUCCESS.create>;

const INITIAL_STATE: State = {
  tasks: [],
};

export function tasksReducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case TasksActions.TASKS_LOAD.SUCCESS.type:
        {
          const {tasks} = action.payload;
          draft.tasks = tasks;
        }
        break;
    }
  });
}
