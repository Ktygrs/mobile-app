// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {MagicUserMetadata} from '@magic-sdk/react-native';
import {magic} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* initUserSaga() {
  try {
    const [token, metadata]: [string, MagicUserMetadata] = yield Promise.all([
      magic.user.getIdToken(),
      magic.user.getMetadata(),
    ]);

    if (token) {
      if (!metadata.issuer) {
        throw new Error('metadata.issuer is empty');
      }

      yield put(AuthActions.SET_TOKEN.STATE.create(token));

      const user: SagaReturnType<typeof Api.user.getUserById> = yield call(
        Api.user.getUserById,
        metadata.issuer,
      );

      yield put(AuthActions.INIT_USER.STATE.create(user));
    } else {
      yield put(AuthActions.INIT_USER.STATE.create(null));
    }
  } catch (error) {
    yield put(AuthActions.INIT_USER.STATE.create(null));
    throw error;
  }
}
