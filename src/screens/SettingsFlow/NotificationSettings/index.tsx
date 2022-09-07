// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {Avatar} from '@components/Avatar/Avatar';
import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {
  NotificationControls,
  NotificationControlsSkeleton,
} from '@screens/SettingsFlow/NotificationSettings/components/NotificationControls';
import {userSelector} from '@store/modules/Auth/selectors';
import {DeviceActions} from '@store/modules/Devices/actions';
import {deviceSettingsSelector} from '@store/modules/Devices/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const NotificationSettings = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, shadowStyle} = useScrollShadow();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(DeviceActions.GET_OR_CREATE_SETTINGS.START.create());
  }, [dispatch]);

  const deviceSettings = useSelector(deviceSettingsSelector);
  const user = useSelector(userSelector) as User;
  const isLoading = useSelector(
    isLoadingSelector.bind(null, DeviceActions.GET_OR_CREATE_SETTINGS),
  );

  return (
    <View style={styles.container}>
      <Header
        title={t('settings.notifications_title')}
        containerStyle={shadowStyle}
        renderRightButtons={LangButton}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[bottomOffset.current, styles.scrollContent]}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.card, commonStyles.baseSubScreen]}>
          <View style={[styles.avatarWrapper, commonStyles.shadow]}>
            <Avatar uri={user.profilePictureUrl} style={styles.avatarImage} />
          </View>
          <Text style={styles.titleText}>
            {t('settings.notifications_title').toUpperCase()}
          </Text>
          {isLoading && !deviceSettings ? (
            <NotificationControlsSkeleton />
          ) : (
            !!deviceSettings && (
              <NotificationControls
                notificationSettings={deviceSettings.notificationSettings}
                disableAllNotifications={deviceSettings.disableAllNotifications}
              />
            )
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
  card: {
    marginTop: rem(80),
    // make bottom overscroll area white, otherwise it'd be of container color
    paddingBottom: 2000,
    marginBottom: -2000,
  },
  scrollContent: {
    flexGrow: 1,
  },
  avatarWrapper: {
    position: 'absolute',
    top: -rem(43),
    left: '50%',
    marginLeft: -rem(43),
  },
  avatarImage: {
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  titleText: {
    marginTop: rem(54),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    ...font(14, 17, 'bold', 'primaryDark'),
  },
});
