// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import ReactMoE from 'react-native-moengage';

export function startTrackingCurrentUser(userID: string) {
  ReactMoE.setUserUniqueID(userID);
}

export function updateUserAttributes(user: User) {
  ReactMoE.setUserName(user.username);
  ReactMoE.setUserFirstName(user.firstName ?? '');
  ReactMoE.setUserLastName(user.lastName ?? '');
  if (user.email) {
    ReactMoE.setUserEmailID(user.email);
  }
  if (user.phoneNumber) {
    ReactMoE.setUserContactNumber(user.phoneNumber);
  }
  if (user.city) {
    ReactMoE.setUserAttribute('city', user.city);
  }
  if (user.country) {
    ReactMoE.setUserAttribute('country', user.country);
  }
}

export function stopTrackingCurrentUser() {
  ReactMoE.logout();
}
