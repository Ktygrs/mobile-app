// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  MenuItem,
  MenuItemSeparator,
} from '@screens/SettingsFlow/Settings/components/MenuItem.tsx';
import {SectionCard} from '@screens/SettingsFlow/Settings/components/SectionCard.tsx';
import {SectionTitle} from '@screens/SettingsFlow/Settings/components/SectionTitle';
import {NotificationsIcon} from '@svg/NotificationsIcon';
import {PersonIcon} from '@svg/PersonIcon';
import {t} from '@translations/i18n';
import React from 'react';

export const ProfileMenuSection = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  return (
    <>
      <SectionTitle text={t('settings.profile').toUpperCase()} />
      <SectionCard>
        <MenuItem
          title={t('settings.personal_information_title')}
          description={t('settings.personal_information_description')}
          renderIcon={PersonIcon}
          onPress={() => navigation.navigate('PersonalInformation')}
        />
        <MenuItemSeparator />
        <MenuItem
          title={t('settings.notifications_title')}
          description={t('settings.notifications_description')}
          renderIcon={() => (
            <NotificationsIcon fill={COLORS.primaryLight} width={20} />
          )}
          onPress={() => navigation.navigate('NotificationSettings')}
        />
      </SectionCard>
    </>
  );
};
