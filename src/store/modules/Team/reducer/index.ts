// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AuthActions} from '@store/modules/Auth/actions';
import {TeamActions} from '@store/modules/Team/actions';
import produce from 'immer';
import {Contact} from 'react-native-contacts';

export interface State {
  search: {
    active: boolean;
    hasNext: boolean;
    query: string;
    result: User[];
  };
  contacts: Contact[];
}

type Actions = ReturnType<
  | typeof TeamActions.SYNC_CONTACTS.SUCCESS.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
  | typeof TeamActions.SET_SEARCH.STATE.create
  | typeof TeamActions.SEARCH_USERS.START.create
  | typeof TeamActions.SEARCH_USERS.SUCCESS.create
>;

const INITIAL_STATE: State = {
  search: {active: false, query: '', hasNext: true, result: []},
  contacts: [],
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case TeamActions.SYNC_CONTACTS.SUCCESS.type: {
        draft.contacts = action.payload.contacts;
        break;
      }
      case TeamActions.SET_SEARCH.STATE.type: {
        draft.search.active = action.payload.active;
        if (action.payload.active) {
          draft.search.result = [];
          draft.search.query = '';
          draft.search.hasNext = true;
        }
        break;
      }
      case TeamActions.SEARCH_USERS.START.type:
        draft.search.query = action.payload.query;
        if (action.payload.offset === 0) {
          draft.search.result = [];
          draft.search.hasNext = true;
        }
        break;
      case TeamActions.SEARCH_USERS.SUCCESS.type:
        const {offset, result} = action.payload;
        if (offset === 0) {
          draft.search.result = result;
        } else {
          draft.search.result = [...state.search.result, ...result];
        }
        if (result.length === 0) {
          draft.search.hasNext = false;
        }
        break;
      case AuthActions.SIGN_OUT.SUCCESS.type: {
        return {...INITIAL_STATE};
      }
    }
  });
}

export const teamReducer = reducer;
