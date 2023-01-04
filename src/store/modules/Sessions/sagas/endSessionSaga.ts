// SPDX-License-Identifier: BUSL-1.1

import {LoginSessionsActions} from '@store/modules/Sessions/actions';
import {getErrorMessage} from '@utils/errors';
import {delay, put} from 'redux-saga/effects';

const actionCreator = LoginSessionsActions.SESSION_END(null).START.create;

export function* endSessionSaga(action: ReturnType<typeof actionCreator>) {
  try {
    // Use sessionId from action.payload to end session
    yield delay(2000);

    yield put(LoginSessionsActions.SESSION_END(action.id).SUCCESS.create());
  } catch (error) {
    yield put(
      LoginSessionsActions.SESSION_END(action.id).FAILED.create(
        getErrorMessage(error),
      ),
    );

    throw error;
  }
}
