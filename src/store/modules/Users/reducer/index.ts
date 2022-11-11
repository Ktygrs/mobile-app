// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {UsersActions} from '@store/modules/Users/actions';
import {produce} from 'immer';

export interface State {
  entities: {[userId: string]: User};
}

type Actions = ReturnType<typeof UsersActions.GET_USER_BY_ID.SUCCESS.create>;

const INITIAL_STATE: State = {
  entities: {},
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case UsersActions.GET_USER_BY_ID.SUCCESS.type:
        const {user} = action.payload;
        draft.entities = {...state.entities, ...{[user.id]: user}};
        break;
    }
  });
}

export const usersReducer = reducer;
