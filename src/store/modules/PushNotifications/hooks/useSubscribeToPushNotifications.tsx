// SPDX-License-Identifier: BUSL-1.1

import type {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import {LinkingActions} from '@store/modules/Linking/actions';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

export function useSubscribeToPushNotifications() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleMessage = (
      message: FirebaseMessagingTypes.RemoteMessage | null,
    ) => {
      if (message?.data?.deeplink) {
        dispatch(
          LinkingActions.HANDLE_URL.STATE.create(message?.data?.deeplink, true),
        );
      }
    };
    /*
         When a notification from FCM has triggered the application to open from a quit state,
         this method will return a `RemoteMessage` containing the notification data, or `null` if
         the app was opened via another method.
         */
    messaging().getInitialNotification().then(handleMessage);
    /*
      When the user presses a notification displayed via FCM, this listener will be called if the app
      has opened from a background state.
      */
    const unsubscribeFromOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp(handleMessage);

    return () => {
      unsubscribeFromOnNotificationOpenedApp();
    };
  }, [dispatch]);
}
