// SPDX-License-Identifier: BUSL-1.1

import {
  NotificationDeliveryChannel,
  NotificationDomain,
  NotificationDomainToggles,
} from '@api/devices/types';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AllNotifications} from '@screens/SettingsFlow/NotificationSettings/components/NotificationControls/components/AllNotifications';
import {NotificationRow} from '@screens/SettingsFlow/NotificationSettings/components/NotificationControls/components/NotificationRow';
import {useConfirmNotificationsDlg} from '@screens/SettingsFlow/NotificationSettings/components/NotificationControls/hooks/useConfirmNotificationsDlg';
import {DeviceActions} from '@store/modules/Devices/actions';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {t} from '@translations/i18n';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  notificationSettings: NotificationDomainToggles;
  notificationDeliveryChannel: NotificationDeliveryChannel;
};

export const NotificationControls = ({
  notificationSettings,
  notificationDeliveryChannel,
}: Props) => {
  const dispatch = useDispatch();
  const hasPushPermissions = useSelector(
    isPermissionGrantedSelector('pushNotifications'),
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const isPushNotificationChannel = notificationDeliveryChannel === 'push';

  const {openConfirmationDlg} = useConfirmNotificationsDlg();

  const changeNotificationSettings = useCallback(
    (type: NotificationDomain, value: boolean) => {
      if (isPushNotificationChannel && !hasPushPermissions) {
        openConfirmationDlg();
      } else {
        dispatch(
          DeviceActions.UPDATE_NOTIFICATION_CHANNEL.START.create(
            {type, enabled: value},
            notificationDeliveryChannel,
          ),
        );
      }
    },
    [
      dispatch,
      hasPushPermissions,
      isPushNotificationChannel,
      notificationDeliveryChannel,
      openConfirmationDlg,
    ],
  );

  const onDisableAllNotifications = useCallback(() => {
    navigation.navigate('PopUp', {
      title: t('settings.notifications.disable_notifications'),
      message: t('settings.notifications.disable_notifications_description'),
      buttons: [
        {
          text: t('button.disable'),
          preset: 'outlined',
          onPress: () => changeNotificationSettings('disable_all', false),
        },
        {
          text: t('button.cancel'),
        },
      ],
    });
  }, [changeNotificationSettings, navigation]);

  const disableAll = notificationSettings.find(
    notificationSetting => notificationSetting.type === 'disable_all',
  );
  return (
    <View style={styles.notificationsContainer}>
      {notificationSettings.map(({type, enabled}) => {
        if (type === 'disable_all') {
          return (
            <AllNotifications
              key={type}
              label={
                enabled
                  ? t('settings.notifications.turn_off_all')
                  : t('settings.notifications.turn_on_all')
              }
              value={
                isPushNotificationChannel
                  ? enabled && hasPushPermissions
                  : enabled
              }
              onValueChange={(value: boolean) => {
                if (value) {
                  changeNotificationSettings('disable_all', value);
                } else {
                  onDisableAllNotifications();
                }
              }}
            />
          );
        }
        return (
          <NotificationRow
            key={type}
            onPress={() => changeNotificationSettings(type, !enabled)}
            type={type}
            checked={enabled}
            disabled={
              !disableAll?.enabled &&
              (!isPushNotificationChannel || hasPushPermissions)
            }
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  notificationsContainer: {
    paddingHorizontal: rem(20),
    paddingTop: rem(18),
  },
});
