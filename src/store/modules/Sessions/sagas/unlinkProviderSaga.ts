// SPDX-License-Identifier: BUSL-1.1

import SessionsActions from '@store/modules/Sessions/actions';
import {getErrorMessage} from '@utils/errors';
import {delay, put} from 'redux-saga/effects';

const actionCreator = SessionsActions.PROVIDER_UNLINK(null).START.create;

export default function* unlinkProviderSaga(
  action: ReturnType<typeof actionCreator>,
) {
  // const {providerId} = action.payload;

  try {
    // Use providerId to unlink provider
    yield delay(2000);

    yield put(SessionsActions.PROVIDER_UNLINK(action.id).SUCCESS.create());
  } catch (error) {
    yield put(
      SessionsActions.PROVIDER_UNLINK(action.id).FAILED.create(
        getErrorMessage(error),
      ),
    );

    throw error;
  }
}
