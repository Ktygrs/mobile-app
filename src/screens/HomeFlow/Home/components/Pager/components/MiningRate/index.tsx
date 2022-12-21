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
          number={'+136.90'}
          bodyStyle={styles.miningValueText}
          decimalsStyle={styles.miningValueDecimalsText}
        />
        <IceLabel
          textStyle={styles.rateValueText}
          iconOffsetY={-1}
          iconSize={16}
          label={t('general.ice_per_hour')}
        />
        <Text style={styles.rateIncreaseText}>+37%</Text>
      </View>
      <View style={styles.baseContainer}>
        <Text style={styles.baseTitleText}>{t('home.mining_rate.base')}</Text>
        <FormattedNumber
          number={'+80.37'}
          bodyStyle={styles.baseValueText}
          decimalsStyle={styles.baseDecimalsText}
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
          <Text style={styles.iconValueText}>+120%</Text>
        </View>
        <View style={styles.iconContainer}>
          <StarIcon />
          <Text style={styles.iconValueText}>+290%</Text>
        </View>
        <View style={styles.iconContainer}>
          <StakeIcon fill={COLORS.white} width={rem(14)} height={rem(14)} />
          <Text style={styles.iconValueText}>+200%</Text>
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
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  miningRateText: {
    marginTop: rem(30),
    ...font(12, 14, 'semibold'),
    marginLeft: rem(4),
  },
  miningValueText: {
    ...font(15, 20, 'bold'),
  },
  miningValueDecimalsText: {
    alignSelf: 'flex-start',
    ...font(8, 0, 'bold'),
    marginRight: rem(4),
    marginLeft: -rem(4),
  },
  baseContainer: {
    marginTop: rem(7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseTitleText: {
    ...font(12, 15, 'medium'),
  },
  baseValueText: {
    ...font(12, 14, 'medium'),
  },
  baseDecimalsText: {
    ...font(7, 8, 'bold'),
    alignSelf: 'flex-start',
    marginRight: rem(4),
    marginLeft: -rem(3),
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
    ...font(15, 18, 'medium'),
  },
  rateIncreaseText: {
    ...font(17, 20, 'bold'),
    color: COLORS.shamrock,
    marginLeft: rem(6),
  },
  iconsContainer: {
    marginTop: rem(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginHorizontal: rem(9),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconValueText: {
    ...font(15, 18, 'bold'),
    color: COLORS.shamrock,
    marginLeft: rem(9),
  },
});
