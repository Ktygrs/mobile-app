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
    // default is true. User has to explicitly disable em
    return true;
  }
  return !settings.some(
    ({type, enabled}) =>
      (type === 'disable_all' && enabled) || (type === channelName && !enabled),
  );
}
