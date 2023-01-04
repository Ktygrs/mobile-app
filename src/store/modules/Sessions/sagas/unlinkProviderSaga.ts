// SPDX-License-Identifier: BUSL-1.1

import {
  getAuthErrorMessage,
  unlinkLoginProviderFromCurrentUser,
} from '@services/auth';
import {LoginSessionsActions} from '@store/modules/Sessions/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put} from 'redux-saga/effects';

const actionCreator = LoginSessionsActions.PROVIDER_UNLINK(null).START.create;

export function* unlinkProviderSaga(action: ReturnType<typeof actionCreator>) {
  const {providerId} = action.payload;

  try {
    yield call(unlinkLoginProviderFromCurrentUser, providerId);

    yield put(LoginSessionsActions.PROVIDER_UNLINK(action.id).SUCCESS.create());
  } catch (error) {
    yield put(
      LoginSessionsActions.PROVIDER_UNLINK(action.id).FAILED.create(
        getAuthErrorMessage(error) ?? getErrorMessage(error),
      ),
    );

    throw error;
  }
}
