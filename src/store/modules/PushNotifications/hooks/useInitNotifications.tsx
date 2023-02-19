// SPDX-License-Identifier: BUSL-1.1

import {ENV} from '@constants/env';
import type {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import {DeviceActions} from '@store/modules/Devices/actions';
import {LinkingActions} from '@store/modules/Linking/actions';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {useEffect} from 'react';
import ReactMoE from 'react-native-moengage/src/index';
import {useDispatch, useSelector} from 'react-redux';
import {isIOS} from 'rn-units/index';

export function useInitNotifications() {
  const hasPushPermissions = useSelector(
    isPermissionGrantedSelector('pushNotifications'),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isIOS) {
      if (hasPushPermissions) {
        ReactMoE.registerForPush();
      }
    } else {
      ReactMoE.pushPermissionResponseAndroid(hasPushPermissions);
      if (hasPushPermissions) {
        ReactMoE.setupNotificationChannelsAndroid();
      }
    }
    dispatch(
      DeviceActions.UPDATE_DEVICE_METADATA.START.create({forceUpdate: true}),
    );

    /*
        Make sure you are setting the Push/InApp callback listeners before calling the initialize().
        https://developers.moengage.com/hc/en-us/articles/4404205878676-Framework-Initialization
       */
    ReactMoE.initialize(ENV.MO_ENGAGE_APP_ID ?? '');
  }, [dispatch, hasPushPermissions]);

  useEffect(() => {
    messaging().getToken().then(console.log);
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

    /*
     * When any FCM payload is received, the listener callback is called with a `RemoteMessage`.
     */
    const unsubscribeFromOnMessage = messaging().onMessage(handleMessage);
    return () => {
      unsubscribeFromOnMessage();
      unsubscribeFromOnNotificationOpenedApp();
    };
  }, [dispatch]);
}
