// SPDX-License-Identifier: BUSL-1.1

import {LINKS} from '@constants/links';
import {MenuItem} from '@screens/SettingsFlow/Settings/components/MenuItem.tsx';
import {SectionTitle} from '@screens/SettingsFlow/Settings/components/SectionTitle';
import {PrivacyIcon} from '@svg/PrivacyIcon';
import {TermsIcon} from '@svg/TermsIcon';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import React from 'react';

export const LegalMenuSection = () => {
  return (
    <>
      <SectionTitle text={t('settings.legal').toUpperCase()} />
      <MenuItem
        title={t('settings.terms_title')}
        description={t('settings.terms_description')}
        renderIcon={TermsIcon}
        onPress={() => openLinkWithInAppBrowser({url: LINKS.TERMS})}
      />
      <MenuItem
        title={t('settings.privacy_title')}
        description={t('settings.privacy_description')}
        renderIcon={PrivacyIcon}
        onPress={() => openLinkWithInAppBrowser({url: LINKS.PRIVACY})}
      />
    </>
  );
};
