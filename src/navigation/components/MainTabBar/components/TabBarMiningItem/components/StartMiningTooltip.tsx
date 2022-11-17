// SPDX-License-Identifier: BUSL-1.1

import {Tooltip} from '@components/Tooltip/Tooltip';
import {COLORS} from '@constants/colors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

export const StartMiningTooltip = () => {
  return (
    <Tooltip
      animated={true}
      style={styles.container}
      chevronStyle={styles.chevron}>
      <Text style={styles.tooltipText}>{t('tabbar.mining_tooltip')}</Text>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.downriver,
    width: rem(200),
    paddingHorizontal: rem(20),
    paddingVertical: rem(11),
    borderRadius: rem(12),
    position: 'absolute',
    alignSelf: 'center',
    bottom: rem(110),
  },
  tooltipText: {
    textAlign: 'center',
    ...font(12, 15, 'black'),
  },
  chevron: {
    position: 'absolute',
    bottom: -rem(7),
    alignSelf: 'center',
    transform: [{rotate: '180deg'}],
  },
});
