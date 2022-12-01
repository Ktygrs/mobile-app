// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {ContactsIcon} from '@svg/ContactsIcon';
import {TierOneIcon} from '@svg/TierOneIcon';
import {TierTwoIcon} from '@svg/TierTwoIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

const styles = StyleSheet.create({
  text: {
    ...font(17, 20, 'semibold', 'secondary'),
    marginLeft: rem(4),
    marginTop: rem(4),
  },
});

export const SEGMENTS = [
  {
    renderText: (active: boolean) => (
      <>
        <ContactsIcon color={active ? COLORS.white : COLORS.secondary} />
        <Text
          style={[
            styles.text,
            {color: active ? COLORS.white : COLORS.secondary},
          ]}>
          {t('team.contacts_tab')}
        </Text>
      </>
    ),
    key: 'Contacts',
  },
  {
    renderText: (active: boolean) => (
      <>
        <TierOneIcon fill={active ? COLORS.white : COLORS.secondary} />
        <Text
          style={[
            styles.text,
            {color: active ? COLORS.white : COLORS.secondary},
          ]}>
          {t('users.referralType.T1')}
        </Text>
      </>
    ),
    key: 'TierOne',
  },
  {
    renderText: (active: boolean) => (
      <>
        <TierTwoIcon fill={active ? COLORS.white : COLORS.secondary} />
        <Text
          style={[
            styles.text,
            {color: active ? COLORS.white : COLORS.secondary},
          ]}>
          {t('users.referralType.T2')}
        </Text>
      </>
    ),
    key: 'TierTwo',
  },
] as const;
