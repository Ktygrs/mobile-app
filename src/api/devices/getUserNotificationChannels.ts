// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {
  NotificationDeliveryChannel,
  NotificationDomainToggles,
} from '@api/devices/types';

/**
 * Returns the user's list of notification channel toggles for the provided notificationChannel.
 */

export async function getUserNotificationChannels(
  notificationDeliveryChannel: NotificationDeliveryChannel,
) {
  const response = await get<NotificationDomainToggles>(
    `/notification-channels/${notificationDeliveryChannel}/toggles`,
  );
  const notificationChannels: NotificationDomainToggles = [];
  response.forEach(({type, enabled}) => {
    notificationChannels.push({
      enabled,
      type: type.toLowerCase(),
    });
  });
  return notificationChannels;
}
