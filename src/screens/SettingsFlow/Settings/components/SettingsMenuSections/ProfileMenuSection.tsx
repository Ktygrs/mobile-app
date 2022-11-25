// SPDX-License-Identifier: BUSL-1.1

import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuItem} from '@screens/SettingsFlow/Settings/components/MenuItem.tsx';
import {SectionTitle} from '@screens/SettingsFlow/Settings/components/SectionTitle';
import {CertificateIcon} from '@svg/CertificateIcon';
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
      <MenuItem
        title={t('settings.personal_information_title')}
        description={t('settings.personal_information_description')}
        renderIcon={PersonIcon}
        onPress={() => navigation.navigate('PersonalInformation')}
      />
      <MenuItem
        title={t('settings.notifications_title')}
        description={t('settings.notifications_description')}
        renderIcon={NotificationsIcon}
        onPress={() => navigation.navigate('NotificationSettings')}
      />
      <MenuItem
        title={t('settings.inapp_privacy_title')}
        description={t('settings.inapp_privacy_description')}
        renderIcon={CertificateIcon}
        onPress={() => {
          navigation.goBack();
          navigation.push('ProfilePrivacyEditStep1');
        }}
      />
    </>
  );
};
