// SPDX-License-Identifier: BUSL-1.1

import {mockAnnouncements, mockNotifications} from '@services/getstream';
import {NotificationActions} from '@store/modules/Notifications/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put, SagaReturnType} from 'redux-saga/effects';

export function* addMockedAllActivitiesSaga() {
  try {
    const announcementsData: SagaReturnType<typeof mockAnnouncements> =
      yield call(mockAnnouncements);
    const notificationsData: SagaReturnType<typeof mockNotifications> =
      yield call(mockNotifications);

    if (announcementsData && notificationsData) {
      yield put(
        NotificationActions.NOTIFICATIONS_LOAD.START.create({isRefresh: true}),
      );
    }
  } catch (error) {
    yield put(
      NotificationActions.NOTIFICATIONS_LOAD.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
