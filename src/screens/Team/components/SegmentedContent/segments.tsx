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

export type SegmentData = {
  renderIcon: (active: boolean) => React.ReactNode;
  renderText: (active: boolean) => React.ReactNode;
  key: string;
};

export const SEGMENTS: Readonly<SegmentData[]> = [
  {
    renderIcon: (active: boolean) => (
      <ContactsIcon color={active ? COLORS.white : COLORS.secondary} />
    ),
    renderText: function (active: boolean) {
      return (
        <>
          {this.renderIcon(active)}
          <Text
            style={[
              styles.text,
              {color: active ? COLORS.white : COLORS.secondary},
            ]}>
            {t('team.contacts_tab')}
          </Text>
        </>
      );
    },
    key: 'Contacts',
  },
  {
    renderIcon: (active: boolean) => (
      <TierOneIcon fill={active ? COLORS.white : COLORS.secondary} />
    ),
    renderText: function (active: boolean) {
      return (
        <>
          {this.renderIcon(active)}
          <Text
            style={[
              styles.text,
              {color: active ? COLORS.white : COLORS.secondary},
            ]}>
            {t('users.referralType.T1')}
          </Text>
        </>
      );
    },
    key: 'TierOne',
  },
  {
    renderIcon: (active: boolean) => (
      <TierTwoIcon fill={active ? COLORS.white : COLORS.secondary} />
    ),
    renderText: function (active: boolean) {
      return (
        <>
          {this.renderIcon(active)}
          <Text
            style={[
              styles.text,
              {color: active ? COLORS.white : COLORS.secondary},
            ]}>
            {t('users.referralType.T2')}
          </Text>
        </>
      );
    },
    key: 'TierTwo',
  },
];
