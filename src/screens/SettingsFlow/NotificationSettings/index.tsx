// SPDX-License-Identifier: BUSL-1.1

import {UserAvatarHeader} from '@components/UserAvatarHeader';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {NotificationControls} from '@screens/SettingsFlow/NotificationSettings/components/NotificationControls';
import {DeviceActions} from '@store/modules/Devices/actions';
import {deviceSettingsSelector} from '@store/modules/Devices/selectors';
import {t} from '@translations/i18n';
import React, {memo, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

export const NotificationSettings = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, shadowStyle} = useScrollShadow();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(DeviceActions.INIT_DEVICE.START.create());
  }, [dispatch]);

  const deviceSettings = useSelector(deviceSettingsSelector);

  return (
    <View style={styles.container}>
      <Header
        title={t('settings.notifications_title')}
        containerStyle={shadowStyle}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[bottomOffset.current, styles.scrollContent]}
        showsVerticalScrollIndicator={false}>
        <UserAvatarHeader />
        <View style={commonStyles.baseSubScreen}>
          {!!deviceSettings && (
            <NotificationControls
              notificationSettings={deviceSettings.notificationSettings}
              disableAllNotifications={deviceSettings.disableAllNotifications}
            />
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
