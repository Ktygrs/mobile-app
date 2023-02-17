// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client';
import {DeviceSettings, NotificationDomainToggles} from '@api/devices/types';
import {Api} from '@api/index';
import {AccountActions} from '@store/modules/Account/actions';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {DeviceActions} from '@store/modules/Devices/actions';
import i18n, {appLocale, setLocale} from '@translations/i18n';
import {getErrorMessage, showError} from '@utils/errors';
import {syncUniqueId} from 'react-native-device-info';
import {all, call, put, SagaReturnType, select} from 'redux-saga/effects';

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
      DeviceActions.GET_OR_CREATE_DEVICE_SETTINGS.SUCCESS.create(
        deviceUniqueId,
        settings,
      ),
    );
  } catch (error) {
    yield put(
      DeviceActions.GET_OR_CREATE_DEVICE_SETTINGS.FAILED.create(
        getErrorMessage(error),
      ),
    );
    showError(error);
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
  let emailNotificationChannel: NotificationDomainToggles;
  let pushNotificationChannel: NotificationDomainToggles;
  try {
    [settings, emailNotificationChannel, pushNotificationChannel] = yield all([
      call(Api.devices.getUserDeviceSettings, {
        userId,
        deviceUniqueId,
      }),
      call(Api.devices.getUserNotificationChannels, 'email'),
      call(Api.devices.getUserNotificationChannels, 'push'),
    ]);

    if (settings.language !== i18n.locale) {
      setLocale(settings.language);
      yield put(AccountActions.SYNC_LANGUAGE_CODE.STATE.create());
    }
  } catch (error) {
    if (isApiError(error, 404, 'DEVICE_SETTINGS_NOT_FOUND')) {
      settings = yield call(
        Api.devices.createUserDeviceSettings,
        {userId, deviceUniqueId},
        {language: appLocale},
      );
      emailNotificationChannel = [];
      pushNotificationChannel = [];
    } else {
      throw error;
    }
  }
  return {
    ...settings,
    emailNotificationSettings: emailNotificationChannel,
    pushNotificationSettings: pushNotificationChannel,
  };
}
