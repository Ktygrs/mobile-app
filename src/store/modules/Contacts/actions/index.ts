// SPDX-License-Identifier: BUSL-1.1

import {createAction} from '@store/utils/actions/createAction';
import {Contact} from 'react-native-contacts';

const INVITE_CONTACT = createAction('INVITE_CONTACT', {
  START: (id: string) => ({id}),
  SUCCESS: (id: string) => ({id}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const SYNC_CONTACTS = createAction('SYNC_CONTACTS', {
  START: true,
  SUCCESS: (contacts: Contact[]) => ({contacts}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

export const ContactsActions = Object.freeze({
  INVITE_CONTACT,
  SYNC_CONTACTS,
});
