// SPDX-License-Identifier: BUSL-1.1

import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {AuthActions} from '@store/modules/Auth/actions';
import {ContactsActions} from '@store/modules/Contacts/actions';
import {all, takeLatest} from 'redux-saga/effects';

import {inviteContactSaga} from './inviteContactSaga';
import {syncContactsSaga} from './syncContactsSaga';

export function* rootTeamSaga() {
  yield all([
    takeLatest(
      [
        AppCommonActions.APP_STATE_CHANGE.STATE.type,
        AppCommonActions.APP_INITIALIZED.STATE.type,
        AuthActions.SIGN_OUT.SUCCESS.type,
      ],
      syncContactsSaga,
    ),
    takeLatest(ContactsActions.INVITE_CONTACT.START.type, inviteContactSaga),
  ]);
}
