// SPDX-License-Identifier: BUSL-1.1

import {NotificationDomain} from '@api/devices/types';
import {pushNotificationByTypeSelector} from '@store/modules/Devices/selectors';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {useSelector} from 'react-redux';

export function useIsPushNotificationsChannelEnabled(
  channelName: NotificationDomain,
) {
  const hasPushPermissions = useSelector(
    isPermissionGrantedSelector('pushNotifications'),
  );
  const settings = useSelector(pushNotificationByTypeSelector);

  if (!hasPushPermissions) {
    return false;
  }

  if (!settings) {
    return true;
  }

  for (const {type, enabled} of settings) {
    if (type === 'disable_all' && enabled) {
      return false;
    }
    if (type === channelName && !enabled) {
      return false;
    }
  }

  return true;
}
