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
  number: string;
  bodyStyle?: StyleProp<TextStyle>;
  decimalsStyle?: StyleProp<TextStyle>;
};

export const FormattedNumber = ({number, bodyStyle, decimalsStyle}: Props) => {
  const [numberInteger, numberDecimals] = number.split('.');
  return (
    <View style={styles.container}>
      <Text
        style={[styles.integerText, bodyStyle]}>{` ${numberInteger}.`}</Text>
      <Text
        style={[
          styles.fractionalText,
          decimalsStyle,
        ]}>{` ${numberDecimals}`}</Text>
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
