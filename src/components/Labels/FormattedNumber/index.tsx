// SPDX-License-Identifier: BUSL-1.1

import {font} from '@utils/styles';
import React from 'react';
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
  numberOfDecimals?: number;
};

export const FormattedNumber = ({
  number,
  bodyStyle,
  decimalsStyle,
  trim = false,
  numberOfDecimals = 2,
}: Props) => {
  const [numberInteger, numberDecimals] = (
    typeof number === 'number' ? number.toLocaleString('en-US') : number
  ).split('.');
  const space = trim ? '' : ' ';
  const hasDecimals = !!numberDecimals;
  return (
    <View style={styles.container}>
      <Text style={[styles.integerText, bodyStyle]}>{`${space}${numberInteger}${
        hasDecimals ? '.' : ''
      }`}</Text>
      {hasDecimals && (
        <Text style={[styles.fractionalText, decimalsStyle]}>
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
