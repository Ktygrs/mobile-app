// SPDX-License-Identifier: BUSL-1.1

import SessionsActions from '@store/modules/Sessions/actions';
import {getErrorMessage} from '@utils/errors';
import {delay, put} from 'redux-saga/effects';

const actionCreator = SessionsActions.SESSION_END(null).START.create;

export default function* endSessionSaga(
  action: ReturnType<typeof actionCreator>,
) {
  // const {sessionId} = action.payload;

  try {
    // Use sessionId to end session
    yield delay(2000);

    yield put(SessionsActions.SESSION_END(action.id).SUCCESS.create());
  } catch (error) {
    yield put(
      SessionsActions.SESSION_END(action.id).FAILED.create(
        getErrorMessage(error),
      ),
    );

    throw error;
  }
}
