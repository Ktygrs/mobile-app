// SPDX-License-Identifier: BUSL-1.1

import {AccountActions} from '@store/modules/Account/actions';
import {deleteAccountSaga} from '@store/modules/Account/sagas/deleteAccount';
import {getAccountSaga} from '@store/modules/Account/sagas/getAccount';
import {signInEmailSaga} from '@store/modules/Account/sagas/signInEmail';
import {signInPhoneSaga} from '@store/modules/Account/sagas/signInPhone';
import {signInSocialSaga} from '@store/modules/Account/sagas/signInSocial';
import {signOutSaga} from '@store/modules/Account/sagas/signOut';
import {syncLanguageCodeSaga} from '@store/modules/Account/sagas/syncLanguageCode';
import {updateAccountSaga} from '@store/modules/Account/sagas/updateAccount';
import {updateRefByUsernameSaga} from '@store/modules/Account/sagas/updateRefByUsernameSaga';
import {userStateChangeSaga} from '@store/modules/Account/sagas/userStateChange';
import {verifyBeforeUpdateEmailSaga} from '@store/modules/Account/sagas/verifyBeforeUpdateEmail';
import {verifyPhoneNumberSaga} from '@store/modules/Account/sagas/verifyPhoneNumber';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {all, fork, takeLatest} from 'redux-saga/effects';

export function* rootAuthSaga() {
  yield all([
    takeLatest(AccountActions.SIGN_IN_EMAIL.START.type, signInEmailSaga),
    takeLatest(AccountActions.SIGN_IN_PHONE.START.type, signInPhoneSaga),
    takeLatest(AccountActions.SIGN_IN_SOCIAL.START.type, signInSocialSaga),
    takeLatest(AccountActions.SIGN_OUT.START.type, signOutSaga),
    takeLatest(AccountActions.DELETE_ACCOUNT.START.type, deleteAccountSaga),
    takeLatest(
      AccountActions.USER_STATE_CHANGE.START.type,
      userStateChangeSaga,
    ),
    takeLatest(AccountActions.UPDATE_ACCOUNT.START.type, updateAccountSaga),
    takeLatest(
      AccountActions.UPDATE_REF_BY_USERNAME.START.type,
      updateRefByUsernameSaga,
    ),
    takeLatest(
      [
        AccountActions.GET_ACCOUNT.START.type,
        AppCommonActions.INTERVAL_UPDATE.STATE.type,
      ],
      getAccountSaga,
    ),
    takeLatest(
      AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.START.type,
      verifyBeforeUpdateEmailSaga,
    ),
    takeLatest(
      AccountActions.VERIFY_PHONE_NUMBER.START.type,
      verifyPhoneNumberSaga,
    ),

    fork(syncLanguageCodeSaga),
  ]);
}
