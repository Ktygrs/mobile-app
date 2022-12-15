// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React, {useMemo} from 'react';
import {
  I18nManager,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';

type Props = {
  number: number | string;
  bodyStyle?: StyleProp<TextStyle>;
  decimalsStyle?: StyleProp<TextStyle>;
  trim?: boolean;
  color?: string;
  numberOfDecimals?: number;
};

export const FormattedNumber = ({
  number,
  bodyStyle,
  decimalsStyle,
  trim = false,
  color = COLORS.white,
  numberOfDecimals = 2,
}: Props) => {
  const [numberInteger, numberDecimals] = (
    typeof number === 'number' ? number.toLocaleString('en-US') : number
  ).split('.');
  const space = trim ? '' : ' ';
  const hasDecimals = !!numberDecimals;
  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        // eslint-disable-next-line react-native/no-unused-styles
        color: {
          color,
        },
      }),
    [color],
  );
  return (
    <View style={styles.container}>
      <Text style={[styles.integerText, bodyStyle, dynamicStyles.color]}>{`${space}${numberInteger}${
        hasDecimals ? '.' : ''
      }`}</Text>
      {hasDecimals && (
        <Text style={[styles.fractionalText, decimalsStyle, dynamicStyles.color]}>
          {numberDecimals.substring(0, numberOfDecimals)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  integerText: {
    ...font(17, 20, 'bold'),
  },
  fractionalText: {
    ...font(10, 12, 'bold'),
    alignSelf: 'flex-start',
  },
});
