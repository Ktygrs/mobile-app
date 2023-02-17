// SPDX-License-Identifier: BUSL-1.1

import {Api} from '@api/index';
import {DeviceActions} from '@store/modules/Devices/actions';
import {getErrorMessage} from '@utils/errors';
import {call, put} from 'redux-saga/effects';

export function* updateNotificationChannel(
  action: ReturnType<
    typeof DeviceActions.UPDATE_NOTIFICATION_CHANNEL.START.create
  >,
) {
  const {notificationChannel, notificationDeliveryChannel} = action.payload;
  try {
    yield call(
      Api.devices.toggleNotificationDomainOnOff,
      notificationChannel,
      notificationDeliveryChannel,
    );

    yield put(
      DeviceActions.UPDATE_NOTIFICATION_CHANNEL.SUCCESS.create(
        notificationChannel,
        notificationDeliveryChannel,
      ),
    );
  } catch (error) {
    yield put(
      DeviceActions.UPDATE_NOTIFICATION_CHANNEL.FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
