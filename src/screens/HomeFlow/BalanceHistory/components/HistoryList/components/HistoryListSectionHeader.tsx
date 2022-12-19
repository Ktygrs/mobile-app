// SPDX-License-Identifier: BUSL-1.1

import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {BalanceDiff} from '@screens/HomeFlow/BalanceHistory/components/HistoryList/mockData';
import {dayjs} from '@services/dayjs';
import {CalendarIcon} from '@svg/CalendarIcon';
import {StarIcon} from '@svg/StarIcon';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  balanceDiff: BalanceDiff;
  time: string;
};

export const HistoryListSectionHeader = ({balanceDiff, time}: Props) => {
  return (
    <View style={styles.container}>
      <CalendarIcon color={COLORS.secondary} />
      <Text style={styles.dateText}>{dayjs(time).format('MMM DD, YYYY')}</Text>
      <StarIcon color={COLORS.secondary} width={rem(11)} height={rem(11)} />
      <Text style={styles.diffPercText}>
        {balanceDiff.bonus > 0 && '+'}
        {balanceDiff.bonus / 100}%
      </Text>
      <Text style={styles.diffNumText}>
        {balanceDiff.negative ? '-' : '+'}
        {balanceDiff.amount}
        <IceLabel color={COLORS.secondary} iconSize={13} iconOffsetY={1} />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: rem(6),
    height: rem(44),
    paddingHorizontal: rem(16),
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  dateText: {
    ...font(12, 17, 'medium', 'secondary'),
    marginLeft: rem(5),
    flex: 1,
  },
  diffPercText: {
    ...font(13, 17, 'bold', 'secondary'),
    marginLeft: rem(5),
  },
  diffNumText: {
    ...font(13, 17, 'bold', 'secondary'),
    marginLeft: rem(20),
  },
});
