// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

const SIZE = rem(66);

type Props = {
  value: number | string;
};

export const Level = ({value}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.valueText}>{value}</Text>
      <Text style={styles.labelText}>{t('global.level').toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: SIZE / 2,
    backgroundColor: COLORS.midnight,
    alignContent: 'center',
    justifyContent: 'center',
  },
  valueText: {
    textAlign: 'center',
    ...font(17, 21, 'black'),
  },
  labelText: {
    textAlign: 'center',
    marginTop: 2,
    ...font(10, 12, 'bold'),
  },
});
