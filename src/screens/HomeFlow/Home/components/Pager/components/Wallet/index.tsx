// SPDX-License-Identifier: BUSL-1.1

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles, SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {useAnimatedNumber} from '@hooks/useAnimatedNumber';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PAGE_HEIGHT} from '@screens/HomeFlow/Home/components/Pager';
import {
  balanceSummarySelector,
  miningRatesSelector,
} from '@store/modules/Tokenomics/selectors';
import {ArrowDown} from '@svg/ArrowDown';
import {ArrowUp} from '@svg/ArrowUp';
import {InfoOutlineIcon} from '@svg/InfoOutlineIcon';
import {t} from '@translations/i18n';
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {isAndroid, rem} from 'rn-units';

const INFO_ICON_SIZE = rem(16);

export const Wallet = memo(() => {
  const balanceSummary = useSelector(balanceSummarySelector);
  const miningRates = useSelector(miningRatesSelector);

  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const animatedBalanceSummary = useAnimatedNumber(
    Number(balanceSummary?.total ?? 0),
  );

  const animatedMiningRatesTotalAmount = useAnimatedNumber(
    Number(miningRates?.total.amount ?? 0) *
      {
        positive: 1,
        negative: -1,
        none: 1,
      }[miningRates?.type ?? 'none'],
  );

  if (!balanceSummary || !miningRates) {
    //TODO: add loading
    return null;
  }

  return (
    <View style={[commonStyles.baseSubScreen, styles.container]}>
      <Text style={styles.balanceLabelText}>{t('home.wallet.balance')}</Text>
      <View style={styles.balanceContainer}>
        <View style={styles.balanceValue}>
          {
            {positive: <ArrowUp />, negative: <ArrowDown />, none: ''}[
              miningRates.type
            ]
          }
          <FormattedNumber
            containerStyle={styles.balanceValueContainer}
            number={formatNumberString(String(animatedBalanceSummary))}
            bodyStyle={styles.balanceValueText}
            decimalsStyle={styles.balanceValueDecimalsText}
          />
          <IceLabel
            textStyle={styles.balanceCurrencyText}
            iconOffsetY={isAndroid ? -2 : 0}
            iconSize={rem(20)}
          />
        </View>
        <Touchable
          hitSlop={SMALL_BUTTON_HIT_SLOP}
          style={styles.infoButton}
          onPress={() => navigation.navigate('BalanceHistory')}>
          <InfoOutlineIcon
            color={COLORS.shamrock}
            width={INFO_ICON_SIZE}
            height={INFO_ICON_SIZE}
          />
        </Touchable>
      </View>
      <View style={styles.miningRate}>
        <Text style={styles.rateLabelText}>{t('home.wallet.rate')} </Text>
        <FormattedNumber
          containerStyle={styles.rateValueContainer}
          number={formatNumberString(String(animatedMiningRatesTotalAmount))}
        />
        <IceLabel
          textStyle={styles.rateValueText}
          iconOffsetY={0}
          iconSize={18}
          label={t('general.ice_per_hour')}
        />
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
  balanceLabelText: {
    marginTop: rem(32),
    ...font(12, 14.4, 'semibold', 'white'),
  },
  balanceContainer: {
    paddingHorizontal: INFO_ICON_SIZE - rem(2),
  },
  balanceValue: {
    marginTop: rem(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceValueContainer: {
    marginRight: rem(6),
  },
  balanceValueText: {
    ...font(32, 38.4, 'black'),
  },
  balanceValueDecimalsText: {
    alignSelf: 'flex-start',
    ...font(15, 20, 'semibold'),
  },
  balanceCurrencyText: {
    ...font(24, 28.8, 'semibold'),
  },
  miningRate: {
    marginTop: rem(10),
    borderRadius: rem(16),
    paddingHorizontal: rem(20),
    paddingVertical: rem(5),
    backgroundColor: COLORS.toreaBay,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateLabelText: {
    ...font(12, 14.4, 'semibold'),
  },
  rateValueContainer: {
    marginLeft: rem(8),
    marginRight: rem(4),
  },
  rateValueText: {
    ...font(17, 20.4, 'bold'),
  },
  rateValueDecimalsText: {
    ...font(10, 12, 'bold'),
    alignSelf: 'flex-start',
  },
  infoButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  iceLabel: {
    alignItems: 'baseline',
  },
});
