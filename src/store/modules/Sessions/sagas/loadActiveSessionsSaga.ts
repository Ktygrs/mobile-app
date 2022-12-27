// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {ApiSession} from '@api/logins/types';
import SessionsActions from '@store/modules/Sessions/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export default function* loadActiveSessionsSaga() {
  try {
    const {
      currentSessionId,
      sessions,
    }: SagaReturnType<typeof Api.logins.getActiveSessions> = yield call(
      Api.logins.getActiveSessions,
    );

    yield put(
      SessionsActions.ACTIVE_SESSIONS_LOAD.SUCCESS.create({
        currentSessionId,

        sessions: sessions.reduce<{
          [sessionId: string]: ApiSession;
        }>((prev, session) => {
          prev[session.sessionId] = session;

          return prev;
        }, {}),
      }),
    );
  } catch (error) {
    yield put(
      SessionsActions.ACTIVE_SESSIONS_LOAD.FAILED.create(
        getErrorMessage(error),
      ),
    );

    throw error;
  }
}
