// SPDX-License-Identifier: BUSL-1.1

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {BalanceDiff} from '@screens/HomeFlow/BalanceHistory/components/HistoryList/mockData';
import {dayjs} from '@services/dayjs';
import {ClockIcon} from '@svg/ClockIcon';
import {FireIcon} from '@svg/FireIcon';
import {StakeIcon} from '@svg/StakeIcon';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

type Props = {
  balanceDiff: BalanceDiff;
  time: string;
};

export const HistoryListItem = ({balanceDiff, time}: Props) => {
  return (
    <View
      style={[
        styles.container,
        styles.containerBackground,
        commonStyles.shadow,
      ]}>
      <View
        style={[
          styles.icon,
          balanceDiff.negative ? styles.iconNegative : styles.iconPositive,
        ]}>
        {balanceDiff.negative ? (
          <FireIcon color={COLORS.white} width={rem(18)} height={rem(24)} />
        ) : (
          <StakeIcon color={COLORS.white} width={rem(18)} height={rem(18)} />
        )}
      </View>
      <View style={styles.body}>
        <Text style={styles.adsDiffValueText}>
          {balanceDiff.negative ? '-' : '+'}
        </Text>
        <FormattedNumber
          number={balanceDiff.amount}
          bodyStyle={styles.adsDiffValueText}
          decimalsStyle={styles.adsDiffDecimalsText}
          trim
        />
        <IceLabel
          color={COLORS.primaryDark}
          iconSize={rem(14)}
          textStyle={styles.iceLabelText}
          iconOffsetY={0}
        />
      </View>
      <Text style={styles.relDiffText}>
        {balanceDiff.bonus > 0 && '+'}
        {balanceDiff.bonus / 100}%
      </Text>
      <ClockIcon width={rem(12)} height={rem(12)} color={COLORS.primaryDark} />
      <Text style={styles.timeText}>{dayjs(time).format('LT')}</Text>
    </View>
  );
};

export const HistoryListItemSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={styles.container} />
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: rem(60),
    marginVertical: rem(7),
    marginHorizontal: rem(16),
    paddingHorizontal: rem(12),
    borderRadius: rem(16),
    alignItems: 'center',
  },
  containerBackground: {
    backgroundColor: COLORS.white,
  },
  icon: {
    width: rem(36),
    height: rem(36),
    borderRadius: rem(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rem(8),
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: rem(8),
  },
  iconPositive: {
    backgroundColor: COLORS.shamrock,
  },
  iconNegative: {
    backgroundColor: COLORS.attention,
  },
  adsDiffValueText: {
    ...font(17, 21, 'black', 'primaryDark'),
  },
  adsDiffDecimalsText: {
    ...font(10, 12, 'regular', 'primaryDark'),
    marginRight: rem(2),
  },
  iceLabelText: {
    ...font(17, 21, 'bold', 'primaryDark'),
  },
  relDiffText: {
    ...font(14, 18, 'medium', 'primaryLight'),
    marginRight: rem(20),
  },
  timeText: {
    ...font(14, 18, 'medium', 'primaryDark'),
    marginLeft: rem(6),
  },
});