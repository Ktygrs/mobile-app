// SPDX-License-Identifier: BUSL-1.1

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles, SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PAGE_HEIGHT} from '@screens/HomeFlow/Home/components/Pager';
import {ArrowDown} from '@svg/ArrowDown';
import {ArrowUp} from '@svg/ArrowUp';
import {InfoOutlineIcon} from '@svg/InfoOutlineIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import {random} from 'lodash';
import React, {memo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {isAndroid, rem} from 'rn-units';

export const Wallet = memo(() => {
  const [direction] = useState(random(1)); //TODO: connect API
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  return (
    <View style={[commonStyles.baseSubScreen, styles.container]}>
      <Text style={styles.balanceLabelText}>{t('home.wallet.balance')}</Text>
      <View>
        <View style={styles.balanceValue}>
          {direction ? <ArrowUp /> : <ArrowDown />}
          <FormattedNumber
            number={'20,249,999.99'}
            bodyStyle={styles.balanceValueText}
            decimalsStyle={styles.balanceValueDecimalsText}
          />
          <IceLabel
            textStyle={styles.balanceCurrencyText}
            iconOffsetY={isAndroid ? -2 : 0}
            iconSize={rem(22)}
          />
        </View>
        <Touchable
          hitSlop={SMALL_BUTTON_HIT_SLOP}
          style={styles.infoButton}
          onPress={() => navigation.navigate('BalanceHistory')}>
          <InfoOutlineIcon
            color={COLORS.shamrock}
            width={rem(16)}
            height={rem(16)}
          />
        </Touchable>
      </View>
      <View style={styles.miningRate}>
        <Text style={styles.rateLabelText}>{t('home.wallet.rate')} </Text>
        <FormattedNumber number={'+29.99'} />
        <IceLabel
          textStyle={styles.rateValueText}
          iconOffsetY={-1}
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
    marginTop: rem(30),
    ...font(12, 15, 'semibold', 'white'),
  },
  balanceValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceValueText: {
    marginTop: rem(4),
    ...font(32, 39, 'black'),
  },
  balanceValueDecimalsText: {
    alignSelf: 'flex-start',
    ...font(13, 20, 'black'),
  },
  balanceCurrencyText: {
    ...font(24, 29, 'semibold'),
  },
  miningRate: {
    marginTop: rem(8),
    borderRadius: rem(16),
    paddingHorizontal: rem(16),
    paddingVertical: rem(5),
    backgroundColor: COLORS.toreaBay,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateLabelText: {
    ...font(12, 15, 'semibold'),
  },
  rateValueText: {
    ...font(17, 20, 'bold'),
  },
  rateValueDecimalsText: {
    ...font(10, 12, 'bold'),
    alignSelf: 'flex-start',
  },
  infoButton: {
    padding: rem(10),
    position: 'absolute',
    top: -rem(14),
    right: -rem(20),
  },
  iceLabel: {
    alignItems: 'baseline',
  },
});