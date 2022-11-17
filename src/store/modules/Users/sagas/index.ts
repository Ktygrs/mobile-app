// SPDX-License-Identifier: BUSL-1.1

import {UsersActions} from '@store/modules/Users/actions';
import {getUserByIdSaga} from '@store/modules/Users/sagas/getUserByIdSaga';
import {takeLeading} from 'redux-saga/effects';

export function* rootUsersSaga() {
  yield takeLeading(UsersActions.GET_USER_BY_ID.START.type, getUserByIdSaga);
}
