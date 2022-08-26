// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {CardBase} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {FriendsIcon} from '@svg/FriendsIcon';
import {TrophyIcon} from '@svg/TrophyIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const RefferalsCard = () => {
  return (
    <CardBase
      backgroundImageSource={require('./assets/images/background.png')}
      headerTitle={t('home.referrals.title')}
      headerTitleIcon={<TrophyIcon fill={COLORS.white} />}
      headerValue={'77'}
      headerValueIcon={<FriendsIcon fill={COLORS.white} />}>
      <View style={[styles.body]}>
        <View style={styles.column}>
          <Text style={styles.labelText}>
            {t('home.referrals.users_tier_1')}
          </Text>
          <Text style={styles.valueText}>59</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.labelText}>
            {t('home.referrals.users_tier_2')}
          </Text>
          <Text style={styles.valueText}>18</Text>
        </View>
      </View>
      <Text style={styles.noteText}>{t('home.referrals.description')}</Text>
    </CardBase>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    marginRight: rem(24),
    flexGrow: 1,
  },
  column: {
    paddingTop: rem(6),
    flex: 1,
  },
  labelText: {
    textTransform: 'uppercase',
    opacity: 0.5,
    ...font(10, 12, 'regular'),
  },
  valueText: {
    marginTop: rem(4),
    ...font(24, 29, 'bold'),
  },
  noteText: {
    marginTop: rem(6),
    marginBottom: rem(12),
    ...font(11, 14, 'regular'),
  },
});
