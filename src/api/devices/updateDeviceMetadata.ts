// SPDX-License-Identifier: BUSL-1.1

import {put} from '@api/client';
import {DeviceMetadata} from '@api/devices/types';

interface Params {
  metadata: DeviceMetadata;
}

/**
 * Replaces existing device metadata with the provided one.
 */

export function updateDeviceMetadata({metadata}: Params) {
  return put(
    `/users/${metadata.userId}/devices/${metadata.deviceUniqueId}/metadata`,
    {
      ...metadata,
    },
  );
}
