// SPDX-License-Identifier: BUSL-1.1

import {MagicUserMetadata} from '@magic-sdk/react-native';
import {magic} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {put} from 'redux-saga/effects';

const actionCreator = AuthActions.SIGN_IN_PHONE.START.create;

export function* signInPhoneSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {phone} = action.payload;
    const token: string = yield magic.auth.loginWithSMS({
      phoneNumber: phone,
    });

    const metadata: MagicUserMetadata = yield magic.user.getMetadata();

    if (!metadata.issuer) {
      throw new Error('metadata.issuer is empty');
    }

    yield put(AuthActions.SET_TOKEN.STATE.create(token));
    yield put(
      AuthActions.SIGN_IN_PHONE.SUCCESS.create({
        userId: metadata.issuer,
        userInfo: {phoneNumber: phone},
      }),
    );
  } catch (error) {
    yield put(AuthActions.SIGN_IN_PHONE.FAILED.create());
    throw error;
  }
}
