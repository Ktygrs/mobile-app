// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client';
import {DeviceMetadata} from '@api/devices/types';
import {Api} from '@api/index';
import messaging from '@react-native-firebase/messaging';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Auth/selectors';
import {DeviceActions} from '@store/modules/Devices/actions';
import {
  deviceUniqueIdSelector,
  lastMetadataUpdateSelector,
} from '@store/modules/Devices/selectors';
import {hoursDiff} from '@utils/date';
import {getErrorMessage} from '@utils/errors';
import DeviceInfo from 'react-native-device-info';
import {call, put, select} from 'redux-saga/effects';

const METADATA_FORCE_UPDATE_HOURS = 8;

export function* updateDeviceMetadataSaga() {
  try {
    const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
      isAuthorizedSelector,
    );
    const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
      isAppActiveSelector,
    );

    const lastUpdateDate: ReturnType<typeof lastMetadataUpdateSelector> =
      yield select(lastMetadataUpdateSelector);

    const hoursFromLastUpdate = hoursDiff(
      new Date(),
      lastUpdateDate ?? new Date(),
    );
    const shouldUpdateMetadata =
      !lastUpdateDate || hoursFromLastUpdate >= METADATA_FORCE_UPDATE_HOURS;

    if (isAuthorized && isAppActive && shouldUpdateMetadata) {
      const [
        fingerprint,
        instanceId,
        hardware,
        product,
        device,
        type,
        tags,
        deviceName,
        carrier,
        manufacturer,
        userAgent,
        pinOrFingerprintSet,
        emulator,
        firstInstallTime,
        lastUpdateTime,
        apiLevel,
        buildId,
        codename,
        installerPackageName,
        baseOS,
        bootloader,
        fcmToken,
      ] = yield Promise.all([
        DeviceInfo.getFingerprint(),
        DeviceInfo.getInstanceId(),
        DeviceInfo.getHardware(),
        DeviceInfo.getProduct(),
        DeviceInfo.getDevice(),
        DeviceInfo.getType(),
        DeviceInfo.getTags(),
        DeviceInfo.getDeviceName(),
        DeviceInfo.getCarrier(),
        DeviceInfo.getManufacturer(),
        DeviceInfo.getUserAgent(),
        DeviceInfo.isPinOrFingerprintSet(),
        DeviceInfo.isEmulator(),
        DeviceInfo.getFirstInstallTime(),
        DeviceInfo.getLastUpdateTime(),
        DeviceInfo.getApiLevel(),
        DeviceInfo.getBuildId(),
        DeviceInfo.getCodename(),
        DeviceInfo.getInstallerPackageName(),
        DeviceInfo.getBaseOs(),
        DeviceInfo.getBootloader(),
        messaging().getToken(),
      ]);

      const userId: ReturnType<typeof userIdSelector> = yield select(
        userIdSelector,
      );
      const deviceUniqueId: ReturnType<typeof deviceUniqueIdSelector> =
        yield select(deviceUniqueIdSelector);

      const collectedMetadata: DeviceMetadata = {
        readableVersion: DeviceInfo.getReadableVersion(),
        fingerprint,
        instanceId,
        hardware,
        product,
        device,
        type,
        tags,
        deviceId: DeviceInfo.getDeviceId(),
        deviceType: DeviceInfo.getDeviceType(),
        deviceName,
        brand: DeviceInfo.getBrand(),
        carrier,
        manufacturer,
        userAgent,
        tablet: DeviceInfo.isTablet(),
        pinOrFingerprintSet,
        emulator,
        firstInstallTime:
          firstInstallTime === -1 ? Date.now() : firstInstallTime,
        lastUpdateTime: lastUpdateTime === -1 ? Date.now() : lastUpdateTime,
        systemName: DeviceInfo.getSystemName(),
        systemVersion: DeviceInfo.getSystemVersion(),
        apiLevel: apiLevel === -1 ? 999 : apiLevel,
        baseOS,
        buildId,
        bootloader: bootloader,
        codename,
        installerPackageName,
        pushNotificationToken: fcmToken,
      };

      yield call(Api.devices.updateDeviceMetadata, {
        deviceId: {userId, deviceUniqueId},
        metadata: collectedMetadata,
      });

      yield put(DeviceActions.UPDATE_DEVICE_METADATA.SUCCESS.create());
    } else {
      yield put(
        DeviceActions.UPDATE_DEVICE_METADATA.FAILED.create(
          'Not authorized or not active',
        ),
      );
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    if (isApiError(error, 400, 'UPDATE_REQUIRED')) {
      yield put(
        DeviceActions.UPDATE_DEVICE_METADATA.FAILED.create(
          errorMessage,
          error.response?.data?.code,
        ),
      );
    } else {
      yield put(
        DeviceActions.UPDATE_DEVICE_METADATA.FAILED.create(errorMessage),
      );
    }
    throw error;
  }
}
