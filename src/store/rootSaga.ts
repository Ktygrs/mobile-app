// SPDX-License-Identifier: BUSL-1.1

import {logError} from '@services/logging';
import {rootLinkingSaga} from '@store/modules/Linking/sagas';
import {rootNotificationsSaga} from '@store/modules/Notifications/sagas';
import {rootStatsSaga} from '@store/modules/Stats/sagas';
import {all, call, spawn} from 'redux-saga/effects';

import {rootAuthSaga} from './modules/Account/sagas';
import {rootAppCommonSaga} from './modules/AppCommon/sagas';
import {rootCollectionsSaga} from './modules/Collections/sagas';
import {rootTeamSaga} from './modules/Contacts/sagas';
import {rootDevicesSaga} from './modules/Devices/sagas';
import {rootNewsSaga} from './modules/News/sagas';
import {rootPermissionsSaga} from './modules/Permissions/sagas';
import {rootReferralsSaga} from './modules/Referrals/sagas';
import {rootLoginSessionsSaga} from './modules/Sessions/sagas';
import {rootUsersSaga} from './modules/Users/sagas';
import {rootValidationSaga} from './modules/Validation/sagas';

export function* rootSaga() {
  const sagas = [
    rootAuthSaga,
    rootNewsSaga,
    rootStatsSaga,
    rootPermissionsSaga,
    rootReferralsSaga,
    rootCollectionsSaga,
    rootTeamSaga,
    rootValidationSaga,
    rootDevicesSaga,
    rootLinkingSaga,
    rootNotificationsSaga,
    rootAppCommonSaga,
    rootUsersSaga,
    rootLoginSessionsSaga,
  ];
  yield all([
    ...sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (error) {
            logError(error);
          }
        }
      }),
    ),
  ]);
}
