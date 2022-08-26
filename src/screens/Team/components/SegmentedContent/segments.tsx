// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {ContactsIcon} from '@screens/Team/assets/svg/Contacts';
import {TierOneIcon} from '@svg/TierOneIcon';
import {TierTwoIcon} from '@svg/TierTwoIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {Text} from 'react-native';

export const SEGMENTS = [
  {
    renderText: (active: boolean) => (
      <>
        <ContactsIcon fill={active ? COLORS.white : COLORS.primaryDark} />
        <Text style={{color: active ? COLORS.white : COLORS.primaryDark}}>
          {t('team.contacts_tab')}
        </Text>
      </>
    ),
    key: 'Contacts',
  },
  {
    renderText: (active: boolean) => (
      <>
        <TierOneIcon fill={active ? COLORS.white : COLORS.primaryDark} />
        <Text style={{color: active ? COLORS.white : COLORS.primaryDark}}>
          {t('users.referralType.T1')}
        </Text>
      </>
    ),
    key: 'TierOne',
  },
  {
    renderText: (active: boolean) => (
      <>
        <TierTwoIcon fill={active ? COLORS.white : COLORS.primaryDark} />
        <Text style={{color: active ? COLORS.white : COLORS.primaryDark}}>
          {t('users.referralType.T2')}
        </Text>
      </>
    ),
    key: 'TierTwo',
  },
] as const;
