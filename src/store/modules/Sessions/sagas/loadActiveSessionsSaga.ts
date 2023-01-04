// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {LoginSession} from '@api/logins/types';
import {LoginSessionsActions} from '@store/modules/Sessions/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* loadActiveSessionsSaga() {
  try {
    const {
      currentSessionId,
      sessions,
    }: SagaReturnType<typeof Api.logins.getActiveLoginSessions> = yield call(
      Api.logins.getActiveLoginSessions,
    );

    yield put(
      LoginSessionsActions.ACTIVE_SESSIONS_LOAD.SUCCESS.create({
        currentSessionId,

        sessions: sessions.reduce<{
          [sessionId: string]: LoginSession;
        }>((prev, session) => {
          prev[session.sessionId] = session;

          return prev;
        }, {}),
      }),
    );
  } catch (error) {
    yield put(
      LoginSessionsActions.ACTIVE_SESSIONS_LOAD.FAILED.create(
        getErrorMessage(error),
      ),
    );

    throw error;
  }
}
