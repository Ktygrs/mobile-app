// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {Avatar} from '@components/Avatar/Avatar';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {AppVersion} from '@screens/SettingsFlow/Settings/components/AppVersion';
import {DeveloperMenuSection} from '@screens/SettingsFlow/Settings/components/SettingsMenuSections/DeveloperMenuSection';
import {LegalMenuSection} from '@screens/SettingsFlow/Settings/components/SettingsMenuSections/LegalMenuSection';
import {ProfileMenuSection} from '@screens/SettingsFlow/Settings/components/SettingsMenuSections/ProfileMenuSection';
import {SupportMenuSection} from '@screens/SettingsFlow/Settings/components/SettingsMenuSections/SupportMenuSection';
import {isAdminSelector, userSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const Settings = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, shadowStyle} = useScrollShadow();
  const user = useSelector(userSelector) as User;
  const isAdmin = useSelector(isAdminSelector);

  return (
    <View style={styles.container}>
      <Header
        title={t('settings.title')}
        renderRightButtons={LangButton}
        containerStyle={shadowStyle}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={bottomOffset.current}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.card, commonStyles.baseSubScreen]}>
          <View style={[styles.avatarWrapper, commonStyles.shadow]}>
            <Avatar uri={user.profilePictureUrl} style={styles.avatarImage} />
          </View>
          <ProfileMenuSection />
          <LegalMenuSection />
          <SupportMenuSection />
          {isAdmin && <DeveloperMenuSection />}
          <AppVersion />
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
    paddingTop: rem(12),
    // make bottom overscroll area white, otherwise it'd be of container color
    paddingBottom: 2000,
    marginBottom: -2000,
  },
  avatarWrapper: {
    position: 'absolute',
    top: -rem(43),
    left: '50%',
    marginLeft: -rem(43),
    borderRadius: rem(25),
  },
  avatarImage: {
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
