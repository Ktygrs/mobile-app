// SPDX-License-Identifier: BUSL-1.1

import {logError} from '@services/logging';
import {all, call, spawn} from 'redux-saga/effects';

import {rootAppCommonSaga} from './modules/AppCommon/sagas';
import {rootAuthSaga} from './modules/Auth/sagas';
import {rootCollectionsSaga} from './modules/Collections/sagas';
import {rootTeamSaga} from './modules/Contacts/sagas';
import {rootDevicesSaga} from './modules/Devices/sagas';
import {rootNewsSaga} from './modules/News/sagas';
import {rootPermissionsSaga} from './modules/Permissions/sagas';
import {rootReferralsSaga} from './modules/Referrals/sagas';
import {rootValidationSaga} from './modules/Validation/sagas';

export function* rootSaga() {
  const sagas = [
    rootAuthSaga,
    rootNewsSaga,
    rootPermissionsSaga,
    rootReferralsSaga,
    rootCollectionsSaga,
    rootTeamSaga,
    rootValidationSaga,
    rootDevicesSaga,
    rootAppCommonSaga,
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
