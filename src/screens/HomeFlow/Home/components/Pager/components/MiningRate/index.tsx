// SPDX-License-Identifier: BUSL-1.1

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {PAGE_HEIGHT} from '@screens/HomeFlow/Home/components/Pager';
import {MiningHammerIcon} from '@svg/MiningHammerIcon';
import {StakeIcon} from '@svg/StakeIcon';
import {StarIcon} from '@svg/StarIcon';
import {TeamIcon} from '@svg/TeamIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const MiningRate = memo(() => {
  return (
    <View style={[commonStyles.baseSubScreen, styles.container]}>
      <View style={styles.titleContainer}>
        <MiningHammerIcon />
        <Text style={styles.miningRateText}>{t('home.mining_rate.title')}</Text>
      </View>
      <View style={styles.miningRate}>
        <FormattedNumber
          trim
          containerStyle={styles.miningValueContainer}
          bodyStyle={styles.miningValueText}
          decimalsStyle={styles.miningValueDecimalsText}
          number={'+136.90'}
        />
        <IceLabel
          textStyle={styles.rateValueText}
          iconOffsetY={-1}
          iconSize={16}
          label={t('general.ice_per_hour')}
        />
        <Text style={styles.rateIncreaseText}>{'+37%'}</Text>
      </View>
      <View style={styles.baseContainer}>
        <Text style={styles.baseTitleText}>{t('home.mining_rate.base')}</Text>
        <FormattedNumber
          trim
          containerStyle={styles.baseValueContainer}
          bodyStyle={styles.baseValueText}
          decimalsStyle={styles.baseDecimalsText}
          number={'+80.37'}
        />
        <IceLabel
          textStyle={styles.baseValueText}
          iconOffsetY={-1}
          iconSize={12}
          label={t('general.ice_per_hour')}
        />
      </View>
      <View style={styles.iconsContainer}>
        <View style={styles.iconContainer}>
          <TeamIcon />
          <Text style={styles.iconValueText}>{'+120%'}</Text>
        </View>
        <View style={styles.iconContainer}>
          <StarIcon />
          <Text style={styles.iconValueText}>{'+290%'}</Text>
        </View>
        <View style={styles.iconContainer}>
          <StakeIcon fill={COLORS.white} width={rem(14)} height={rem(14)} />
          <Text style={styles.iconValueText}>{'+200%'}</Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparent,
    height: PAGE_HEIGHT + rem(30),
    marginBottom: -rem(30),
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: rem(25),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  miningRateText: {
    ...font(12, 14, 'semibold'),
    marginLeft: rem(4),
  },
  miningValueContainer: {
    marginRight: rem(4),
  },
  miningValueText: {
    ...font(17, 20.4, 'bold'),
  },
  miningValueDecimalsText: {
    alignSelf: 'flex-start',
    ...font(9, 11, 'bold'),
  },
  baseContainer: {
    marginTop: rem(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseTitleText: {
    ...font(12, 15, 'medium'),
  },
  baseValueContainer: {
    marginHorizontal: rem(4),
  },
  baseValueText: {
    ...font(12, 14.4, 'medium'),
  },
  baseDecimalsText: {
    ...font(7, 9, 'bold'),
    alignSelf: 'flex-start',
  },
  miningRate: {
    marginTop: rem(4),
    borderRadius: rem(16),
    paddingHorizontal: rem(20),
    paddingVertical: rem(6),
    backgroundColor: COLORS.toreaBay,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateValueText: {
    ...font(15, 19, 'medium'),
  },
  rateIncreaseText: {
    marginLeft: rem(8),
    ...font(17, 20.4, 'bold'),
    color: COLORS.shamrock,
  },
  iconsContainer: {
    marginTop: rem(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginHorizontal: rem(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconValueText: {
    marginLeft: rem(6),
    ...font(15, undefined, 'bold'),
    color: COLORS.shamrock,
  },
});
