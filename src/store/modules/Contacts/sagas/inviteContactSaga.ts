// SPDX-License-Identifier: BUSL-1.1

import {ContactsActions} from '@store/modules/Contacts/actions';
import {t} from '@translations/i18n';
import {getContactName} from '@utils/contacts';
import {openSMS} from '@utils/device';
import {getErrorMessage, showError} from '@utils/errors';
import {Contact, getContactById} from 'react-native-contacts';
import {call, put} from 'redux-saga/effects';

export function* inviteContactSaga(
  action: ReturnType<typeof ContactsActions.INVITE_CONTACT.START.create>,
) {
  try {
    const {id} = action.payload;
    const contact: Contact | null = yield call(getContactById, id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    if (!contact.phoneNumbers.length) {
      throw new Error('Contact has no phone numbers');
    }
    const text = `${t('team.contacts_list.invitation_text', {
      name: getContactName(contact),
    })}`;
    const [{number}] = contact.phoneNumbers;
    openSMS(number, text);

    yield put(ContactsActions.INVITE_CONTACT.SUCCESS.create(id));
  } catch (error) {
    yield put(
      ContactsActions.INVITE_CONTACT.FAILED.create(getErrorMessage(error)),
    );
    showError(error);
    throw error;
  }
}
