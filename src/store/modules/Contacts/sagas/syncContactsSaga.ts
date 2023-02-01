// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {logError} from '@services/logging';
import {AccountActions} from '@store/modules/Account/actions';
import {
  isAuthorizedSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {ContactsActions} from '@store/modules/Contacts/actions';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {getErrorMessage} from '@utils/errors';
import {
  beautifyPhoneNumber,
  e164PhoneNumber,
  hashPhoneNumber,
} from '@utils/phoneNumber';
import {Contact, getAll} from 'react-native-contacts';
import {
  call,
  put,
  SagaReturnType,
  select,
  SelectEffect,
  take,
} from 'redux-saga/effects';

function notNull<V>(value: V | null): value is V {
  return value !== null;
}

function* readyToSync(): Generator<SelectEffect, boolean, boolean> {
  const hasPermissions: boolean = yield select(
    isPermissionGrantedSelector('contacts'),
  );
  const isAuthorized: boolean = yield select(isAuthorizedSelector);
  const isAppActive: boolean = yield select(isAppActiveSelector);
  return hasPermissions && isAuthorized && isAppActive;
}

export function* syncContactsSaga() {
  try {
    while (!(yield* readyToSync())) {
      yield take('*');
    }

    const user: User = yield select(userSelector);
    const phoneNumberHashes = new Set(user.agendaPhoneNumberHashes?.split(','));

    const contacts: SagaReturnType<typeof getAll> = yield call(getAll);
    const agendaPhoneNumbers: string[] = [];
    const filteredPhoneNumbers: Contact[] = contacts
      .map<Contact | null>((contact: Contact) => {
        if (
          contact.givenName.trim() === '' &&
          contact.familyName.trim() === '' &&
          contact.middleName.trim() === ''
        ) {
          return null;
        }

        const formattedPhoneNumbers: typeof contact.phoneNumbers = [];
        const validNumbers = contact.phoneNumbers.filter(record => {
          try {
            const e164FormattedForHash = e164PhoneNumber(
              record.number,
              user.country,
            );
            const internationallyFormatted = beautifyPhoneNumber(
              record.number,
              user.country,
            );
            formattedPhoneNumbers.push({
              ...record,
              number: internationallyFormatted,
            });
            agendaPhoneNumbers.push(e164FormattedForHash);
            return true;
          } catch (error) {
            logError(error);
            return false;
          }
        });

        if (validNumbers.length > 0) {
          return {...contact, phoneNumbers: formattedPhoneNumbers};
        }
        return null;
      })
      .filter(notNull);

    const agendaPhoneNumberHashes: string[] = yield Promise.all(
      agendaPhoneNumbers.map(hashPhoneNumber),
    );

    const numberOfHashes = phoneNumberHashes.size;
    agendaPhoneNumberHashes.forEach(hash => phoneNumberHashes.add(hash));

    if (numberOfHashes !== phoneNumberHashes.size) {
      yield put(
        AccountActions.UPDATE_ACCOUNT.START.create(
          {
            agendaPhoneNumberHashes: [...phoneNumberHashes].join(','),
          },
          function* (freshUser) {
            if (
              freshUser.agendaPhoneNumberHashes?.length !==
              user.agendaPhoneNumberHashes?.length
            ) {
              yield put(ContactsActions.SYNC_CONTACTS.START.create());
              return {retry: false};
            }
            return {retry: true};
          },
        ),
      );
    }

    yield put(
      ContactsActions.SYNC_CONTACTS.SUCCESS.create(filteredPhoneNumbers),
    );
  } catch (error) {
    yield put(
      ContactsActions.SYNC_CONTACTS.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
