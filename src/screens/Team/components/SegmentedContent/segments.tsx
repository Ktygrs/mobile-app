// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {ContactsIcon} from '@svg/ContactsIcon';
import {TierOneIcon} from '@svg/TierOneIcon';
import {TierTwoIcon} from '@svg/TierTwoIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...font(17, 20, 'semibold', 'secondary'),
    marginLeft: rem(4),
  },
  contactsIcon: {marginLeft: rem(-1)},
  tierIcon: {marginLeft: rem(-5)},
  tierTwoIcon: {marginLeft: rem(-4)},
});

export const SEGMENTS = [
  {
    renderText: (active: boolean) => (
      <View style={styles.row}>
        <View style={styles.contactsIcon}>
          <ContactsIcon
            width={rem(20)}
            height={rem(20)}
            color={active ? COLORS.white : COLORS.secondary}
          />
        </View>
        <Text
          style={[
            styles.text,
            {color: active ? COLORS.white : COLORS.secondary},
          ]}>
          {t('team.contacts_tab')}
        </Text>
      </View>
    ),
    key: 'Contacts',
  },
  {
    renderText: (active: boolean) => (
      <View style={styles.row}>
        <View style={styles.tierIcon}>
          <TierOneIcon
            width={rem(20)}
            height={rem(20)}
            fill={active ? COLORS.white : COLORS.secondary}
          />
        </View>
        <Text
          style={[
            styles.text,
            {color: active ? COLORS.white : COLORS.secondary},
          ]}>
          {t('users.referralType.T1')}
        </Text>
      </View>
    ),
    key: 'TierOne',
  },
  {
    renderText: (active: boolean) => (
      <View style={styles.row}>
        <View style={styles.tierTwoIcon}>
          <TierTwoIcon
            width={rem(20)}
            height={rem(20)}
            fill={active ? COLORS.white : COLORS.secondary}
          />
        </View>
        <Text
          style={[
            styles.text,
            {color: active ? COLORS.white : COLORS.secondary},
          ]}>
          {t('users.referralType.T2')}
        </Text>
      </View>
    ),
    key: 'TierTwo',
  },
] as const;
