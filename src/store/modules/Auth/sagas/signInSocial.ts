// SPDX-License-Identifier: BUSL-1.1

import {ENV} from '@constants/env';
import {OAuthRedirectResult} from '@magic-ext/react-native-oauth';
import {magic} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {put} from 'redux-saga/effects';

const actionCreator = AuthActions.SIGN_IN_SOCIAL.START.create;

export function* signInSocialSaga(action: ReturnType<typeof actionCreator>) {
  try {
    const {provider} = action.payload;

    const socialLoginInfo: OAuthRedirectResult =
      yield magic.oauth.loginWithPopup({
        provider,
        redirectURI: `${ENV.MAGIC_DEEPLINK_SCHEME}://login`,
      });

    const userId = socialLoginInfo.magic.userMetadata.issuer;
    const token = socialLoginInfo.magic.idToken;

    if (!userId) {
      throw new Error('metadata.issuer is empty');
    }

    const userInfo = socialLoginInfo.oauth.userInfo;

    yield put(AuthActions.SET_TOKEN.STATE.create(token));
    yield put(
      AuthActions.SIGN_IN_SOCIAL.SUCCESS.create({
        userId,
        userInfo: {
          email: userInfo.email,
          phoneNumber: userInfo.phoneNumber,
          username: userInfo.preferredUsername ?? userInfo.nickname,
          firstName: userInfo.givenName,
          lastName: userInfo.familyName,
        },
      }),
    );
  } catch (error) {
    yield put(AuthActions.SIGN_IN_SOCIAL.FAILED.create());
    throw error;
  }
}
