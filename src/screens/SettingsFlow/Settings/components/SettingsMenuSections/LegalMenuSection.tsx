// SPDX-License-Identifier: BUSL-1.1

import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuItem} from '@screens/SettingsFlow/Settings/components/MenuItem.tsx';
import {SectionTitle} from '@screens/SettingsFlow/Settings/components/SectionTitle';
import {PrivacyIcon} from '@svg/PrivacyIcon';
import {TermsIcon} from '@svg/TermsIcon';
import {t} from '@translations/i18n';
import React from 'react';

export const LegalMenuSection = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  return (
    <>
      <SectionTitle text={t('settings.legal').toUpperCase()} />
      <MenuItem
        title={t('settings.terms_title')}
        description={t('settings.terms_description')}
        renderIcon={TermsIcon}
        onPress={() =>
          navigation.navigate('WebView', {
            url: t('general.terms_url'),
            title: t('webview.terms_title'),
          })
        }
      />
      <MenuItem
        title={t('settings.privacy_title')}
        description={t('settings.privacy_description')}
        renderIcon={PrivacyIcon}
        onPress={() => {
          navigation.navigate('WebView', {
            url: t('general.privacy_url'),
            title: t('webview.privacy_title'),
          });
        }}
      />
    </>
  );
};
