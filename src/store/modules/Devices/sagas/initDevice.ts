// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client';
import {DeviceSettings} from '@api/devices/types';
import {Api} from '@api/index';
import {AccountActions} from '@store/modules/Account/actions';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {DeviceActions} from '@store/modules/Devices/actions';
import i18n, {appLocale} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {syncUniqueId} from 'react-native-device-info';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* initDeviceSaga() {
  try {
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );
    const deviceUniqueId: SagaReturnType<typeof syncUniqueId> = yield call(
      syncUniqueId,
    );

    let settings: DeviceSettings | null = null;
    if (isAuthorized) {
      const userId: ReturnType<typeof userIdSelector> = yield select(
        userIdSelector,
      );
      settings = yield call(getOrCreateDeviceSettings, {
        userId,
        deviceUniqueId,
      });
    }

    yield put(
      DeviceActions.INIT_DEVICE.SUCCESS.create(deviceUniqueId, settings),
    );
  } catch (error) {
    yield put(DeviceActions.INIT_DEVICE.FAILED.create(getErrorMessage(error)));
    throw error;
  }
}

export function* getOrCreateDeviceSettings({
  userId,
  deviceUniqueId,
}: {
  userId: string;
  deviceUniqueId: string;
}) {
  let settings: DeviceSettings;
  try {
    settings = yield call(Api.devices.getUserDeviceSettings, {
      userId,
      deviceUniqueId,
    });
    if (settings.language !== i18n.locale) {
      i18n.locale = settings.language;
      yield put(AccountActions.SYNC_LANGUAGE_CODE.STATE.create());
    }
  } catch (error) {
    if (isApiError(error, 404, 'DEVICE_SETTINGS_NOT_FOUND')) {
      settings = yield call(
        Api.devices.createUserDeviceSettings,
        {userId, deviceUniqueId},
        {language: appLocale},
      );
    } else {
      throw error;
    }
  }
  return settings;
}
