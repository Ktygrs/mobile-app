// SPDX-License-Identifier: BUSL-1.1

import {NotificationDomain} from '@api/devices/types';
import messaging from '@react-native-firebase/messaging';
import {logError} from '@services/logging';
import {userIdSelector} from '@store/modules/Account/selectors';
import {useIsPushNotificationsChannelEnabled} from '@store/modules/Devices/hooks/useIsPushNotificationsChannelEnabled';
import {deviceLanguageSelector} from '@store/modules/Devices/selectors';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

export function useSubscribeToChannelTopic(channelName: NotificationDomain) {
  const channelEnabled = useIsPushNotificationsChannelEnabled(channelName);
  const language = useSelector(deviceLanguageSelector);
  const userId = useSelector(userIdSelector);

  useEffect(() => {
    if (channelEnabled && language && userId) {
      messaging()
        .subscribeToTopic(`${channelName}_${language}`)
        .catch(logError);
    }
    return () => {
      if (language) {
        messaging()
          .unsubscribeFromTopic(`${channelName}_${language}`)
          .catch(logError);
      }
    };
  }, [channelEnabled, channelName, language, userId]);
}
