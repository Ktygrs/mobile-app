// SPDX-License-Identifier: BUSL-1.1

import {
  NotificationDomain,
  NotificationDomainToggles,
} from '@api/devices/types';
import {pushNotificationByTypeSelector} from '@store/modules/Devices/selectors';
import {useSelector} from 'react-redux';

export function useIsNotificationsChannelEnabled(
  channelName: NotificationDomain,
) {
  const settings: NotificationDomainToggles | undefined = useSelector(
    pushNotificationByTypeSelector,
  );

  if (!settings) {
    return false;
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
