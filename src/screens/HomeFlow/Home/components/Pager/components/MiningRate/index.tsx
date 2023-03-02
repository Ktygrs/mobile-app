// SPDX-License-Identifier: BUSL-1.1

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useAnimatedNumber} from '@hooks/useAnimatedNumber';
import {PAGE_HEIGHT} from '@screens/HomeFlow/Home/components/Pager';
import {miningRatesSelector} from '@store/modules/Tokenomics/selectors';
import {CoinsStackIcon} from '@svg/CoinsStackIcon';
import {MiningHammerIcon} from '@svg/MiningHammerIcon';
import {StarIcon} from '@svg/StarIcon';
import {TeamIcon} from '@svg/TeamIcon';
import {t} from '@translations/i18n';
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const MiningRate = memo(() => {
  const miningRates = useSelector(miningRatesSelector);

  const animatedMiningRatesTotalAmount = useAnimatedNumber(
    Number(miningRates?.total.amount ?? 0) *
      {
        positive: 1,
        negative: -1,
        none: 1,
      }[miningRates?.type ?? 'none'],
  );

  const animatedMiningRatesBaseAmount = useAnimatedNumber(
    Number(miningRates?.base.amount ?? 0),
  );

  const animatedMiningRatesTotalBonusesTier = useAnimatedNumber(
    (miningRates?.total.bonuses?.t1 ?? 0) +
      (miningRates?.total.bonuses?.t2 ?? 0),
  );

  const animatedMiningRateTotalBonusesExtra = useAnimatedNumber(
    miningRates?.total.bonuses?.extra ?? 0,
  );

  const animatedMiningRateTotalBonusesPreStaking = useAnimatedNumber(
    miningRates?.total.bonuses?.preStaking ?? 0,
  );

  if (!miningRates) {
    //TODO: add loading
    return null;
  }

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
          number={formatNumberString(String(animatedMiningRatesTotalAmount))}
          bodyStyle={styles.miningValueText}
          decimalsStyle={styles.miningValueDecimalsText}
        />
        <IceLabel
          textStyle={styles.rateValueText}
          iconOffsetY={-1}
          iconSize={16}
          label={t('general.ice_per_hour')}
        />
        {!!miningRates.total.bonuses?.total && (
          <Text style={styles.rateIncreaseText}>
            +{miningRates.total.bonuses.total}%
          </Text>
        )}
      </View>
      <View style={styles.baseContainer}>
        <Text style={styles.baseTitleText}>{t('home.mining_rate.base')}</Text>
        <FormattedNumber
          trim
          containerStyle={styles.baseValueContainer}
          number={formatNumberString(String(animatedMiningRatesBaseAmount))}
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
          <Text style={styles.iconValueText}>
            {`+${animatedMiningRatesTotalBonusesTier}%`}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <StarIcon />
          <Text style={styles.iconValueText}>
            {`+${animatedMiningRateTotalBonusesExtra}%`}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <CoinsStackIcon
            fill={COLORS.white}
            width={rem(14)}
            height={rem(14)}
          />
          <Text style={styles.iconValueText}>
            {`+${animatedMiningRateTotalBonusesPreStaking}%`}
          </Text>
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
    ...font(8, 10, 'bold'),
    marginRight: rem(4),
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
    marginRight: rem(4),
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
