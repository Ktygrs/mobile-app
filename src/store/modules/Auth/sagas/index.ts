// SPDX-License-Identifier: BUSL-1.1

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {AuthActions} from '@store/modules/Auth/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {deleteAccountSaga} from './deleteAccount';
import {finishAuthSaga} from './finishAuthSaga';
import {initUserSaga} from './initUser';
import {signInEmailSaga} from './signInEmail';
import {signInPhoneSaga} from './signInPhone';
import {signInSocialSaga} from './signInSocial';
import {signOutSaga} from './signOut';
import {updateAccountSaga} from './updateAccount';

export function* rootAuthSaga() {
  yield all([
    takeLatest(AppCommonActions.APP_LOADED.STATE.type, initUserSaga),
    takeLatest(AuthActions.SIGN_IN_EMAIL.START.type, signInEmailSaga),
    takeLatest(AuthActions.SIGN_IN_PHONE.START.type, signInPhoneSaga),
    takeLatest(AuthActions.SIGN_IN_SOCIAL.START.type, signInSocialSaga),
    takeLatest(AuthActions.SIGN_OUT.START.type, signOutSaga),
    takeLatest(AuthActions.DELETE_ACCOUNT.START.type, deleteAccountSaga),
    takeLatest(
      [
        AuthActions.SIGN_IN_SOCIAL.SUCCESS.type,
        AuthActions.SIGN_IN_EMAIL.SUCCESS.type,
        AuthActions.SIGN_IN_PHONE.SUCCESS.type,
      ],
      finishAuthSaga,
    ),
    takeLatest(AuthActions.UPDATE_ACCOUNT.START.type, updateAccountSaga),
  ]);
}
