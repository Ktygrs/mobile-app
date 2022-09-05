// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {TeamActions} from '@store/modules/Team/actions';
import {getErrorMessage} from '@utils/errors';
import {put, SagaReturnType} from 'redux-saga/effects';

const actionCreator = TeamActions.SEARCH_USERS.START.create;

export function* searchUsersSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {query, offset} = action.payload;

    if (!query) {
      yield put(TeamActions.SEARCH_USERS.SUCCESS.create([], {query, offset}));
      return;
    }

    const result: SagaReturnType<typeof Api.user.searchUsers> =
      yield Api.user.searchUsers({query, offset, limit: 20});
    yield put(TeamActions.SEARCH_USERS.SUCCESS.create(result, {query, offset}));
  } catch (error) {
    yield put(TeamActions.SEARCH_USERS.FAILED.create(getErrorMessage(error)));
    throw error;
  }
}
