// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {LogoIconSvg} from '@svg/LogoIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const Intro = memo(() => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <LogoIconSvg color={COLORS.white} width={rem(26)} height={rem(26)} />
        <Text style={styles.titleText}>{t('staking.title')}</Text>
      </View>
      <Text style={styles.noteText}>{t('staking.benefits_description')}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(18),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    marginLeft: rem(6),
    marginTop: rem(2),
    ...font(24, 29, 'black'),
  },
  noteText: {
    marginTop: rem(12),
    ...font(14, 20, 'regular', 'secondaryFaint'),
  },
});
