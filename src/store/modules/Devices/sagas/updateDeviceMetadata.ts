// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client';
import {DeviceMetadata} from '@api/devices/types';
import {Api} from '@api/index';
import {DEVICE_METADATA_UPDATE_TIMEOUT_HOURS} from '@constants/timeouts';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {DeviceActions} from '@store/modules/Devices/actions';
import {
  deviceUniqueIdSelector,
  lastMetadataUpdateSelector,
} from '@store/modules/Devices/selectors';
import {getErrorMessage} from '@utils/errors';
import dayjs from 'dayjs';
import DeviceInfo from 'react-native-device-info';
import {call, put, select} from 'redux-saga/effects';

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

    const hoursFromLastUpdate = lastUpdateDate
      ? dayjs().diff(lastUpdateDate, 'hours')
      : 0;
    const shouldUpdateMetadata =
      !lastUpdateDate ||
      hoursFromLastUpdate >= DEVICE_METADATA_UPDATE_TIMEOUT_HOURS;

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
        pushNotificationToken: '', //TODO: get fcm token from firebase messaging
        userId,
        deviceUniqueId,
      };

      yield call(Api.devices.updateDeviceMetadata, {
        metadata: collectedMetadata,
      });

      yield put(DeviceActions.UPDATE_DEVICE_METADATA.SUCCESS.create());
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
