// SPDX-License-Identifier: BUSL-1.1

import {Task} from '@api/tasks/types';
import {AccountActions} from '@store/modules/Account/actions';
import {TasksActions} from '@store/modules/Tasks/actions';
import produce from 'immer';

export interface State {
  list: Task[];
}

type Actions = ReturnType<
  | typeof TasksActions.GET_TASKS.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  list: [],
};

export function tasksReducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case TasksActions.GET_TASKS.SUCCESS.type:
        {
          const {tasks} = action.payload;
          draft.list = tasks;
        }
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {...INITIAL_STATE};
      }
    }
  });
}
