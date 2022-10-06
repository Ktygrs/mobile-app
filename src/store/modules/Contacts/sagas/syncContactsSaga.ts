// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {AuthActions} from '@store/modules/Auth/actions';
import {
  isAuthorizedSelector,
  userSelector,
} from '@store/modules/Auth/selectors';
import {ContactsActions} from '@store/modules/Contacts/actions';
import {permissionSelector} from '@store/modules/Permissions/selectors';
import {getErrorMessage} from '@utils/errors';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import {getAllWithoutPhotos} from 'react-native-contacts';
import {
  call,
  put,
  SagaReturnType,
  select,
  SelectEffect,
  take,
} from 'redux-saga/effects';

function* readyToSync(): Generator<SelectEffect, boolean, boolean> {
  const hasPermissions: boolean = yield select(permissionSelector('contacts'));
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

    let contacts: SagaReturnType<typeof getAllWithoutPhotos> = yield call(
      getAllWithoutPhotos,
    );

    const agendaPhoneNumbers = contacts.reduce<string[]>((numbers, contact) => {
      return numbers.concat(
        contact.phoneNumbers.reduce<string[]>((contactNumbers, record) => {
          try {
            return [
              ...contactNumbers,
              e164PhoneNumber(record.number, user.country),
            ];
          } catch {
            // skip number in case of error
            return contactNumbers;
          }
        }, []),
      );
    }, []);

    const agendaPhoneNumberHashes: string[] = yield Promise.all(
      agendaPhoneNumbers.map(hashPhoneNumber),
    );

    const numberOfHashes = phoneNumberHashes.size;
    agendaPhoneNumberHashes.forEach(hash => phoneNumberHashes.add(hash));

    if (numberOfHashes !== phoneNumberHashes.size) {
      yield put(
        AuthActions.UPDATE_ACCOUNT.START.create(
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

    yield put(ContactsActions.SYNC_CONTACTS.SUCCESS.create(contacts));
  } catch (error) {
    yield put(
      ContactsActions.SYNC_CONTACTS.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
