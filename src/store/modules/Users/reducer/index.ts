// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {UsersActions} from '@store/modules/Users/actions';
import {produce} from 'immer';

export interface State {
  user: User | null;
}

type Actions = ReturnType<typeof UsersActions.GET_USER_BY_ID.SUCCESS.create>;

const INITIAL_STATE: State = {
  user: null,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case UsersActions.GET_USER_BY_ID.SUCCESS.type:
        const {user} = action.payload;
        draft.user = user;
        break;
    }
  });
}

export const usersReducer = reducer;
