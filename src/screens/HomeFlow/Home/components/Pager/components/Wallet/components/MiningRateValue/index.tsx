// SPDX-License-Identifier: BUSL-1.1

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {COLORS} from '@constants/colors';
import {useAnimatedNumber} from '@hooks/useAnimatedNumber';
import {miningRatesSelector} from '@store/modules/Tokenomics/selectors';
import {formatNumberString, parseNumber} from '@utils/numbers';
import React, {useMemo} from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import {useSelector} from 'react-redux';

interface Props {
  style?: StyleProp<TextStyle>;
}

export const MiningRateValue = ({style}: Props) => {
  const miningRates = useSelector(miningRatesSelector);

  const animatedMiningRatesTotalAmount = useAnimatedNumber(
    parseNumber(miningRates?.total.amount ?? '0') *
      {
        positive: 1,
        negative: -1,
        none: 1,
      }[miningRates?.type ?? 'none'],
    v => `${v > 0 ? '+' : ''}${formatNumberString(String(v))}`,
  );

  const rateValueTextStyle = useMemo(() => {
    switch (animatedMiningRatesTotalAmount.slice(0, 1)) {
      case '+':
        return styles.positive;

      case '-':
        return styles.negative;
    }

    return styles.neutral;
  }, [animatedMiningRatesTotalAmount]);

  return (
    <FormattedNumber
      containerStyle={style}
      bodyStyle={rateValueTextStyle}
      decimalsStyle={rateValueTextStyle}
      number={animatedMiningRatesTotalAmount}
      trim
    />
  );
};

const styles = StyleSheet.create({
  positive: {
    color: COLORS.shamrock,
  },

  negative: {
    color: COLORS.attention,
  },

  neutral: {
    color: COLORS.white,
  },
});
