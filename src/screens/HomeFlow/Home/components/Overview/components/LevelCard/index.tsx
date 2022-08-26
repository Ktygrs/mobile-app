// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {CardBase} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {PioneerIcon} from '@svg/PioneerIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const LevelCard = () => {
  return (
    <CardBase
      backgroundImageSource={require('./assets/images/background.png')}
      headerTitle={t('home.pioneer.title')}
      headerTitleIcon={<PioneerIcon fill={COLORS.white} />}
      headerValue={t('global.level') + ' 1'}>
      <View style={[styles.body]}>
        <View style={styles.column}>
          <Text style={styles.labelText}>{t('home.pioneer.referrals')}</Text>
          <Text style={styles.valueText}>125</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.labelText}>{t('home.pioneer.rank')}</Text>
          <Text style={styles.valueText}>606,683</Text>
        </View>
      </View>
      <Text style={styles.noteText}>{t('home.pioneer.description')}</Text>
    </CardBase>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    marginRight: rem(24),
  },
  column: {
    paddingTop: rem(6),
    flex: 1,
  },
  labelText: {
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
