// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  icon: ReactNode;
  label: string;
  value: string;
  fractions?: string;
  currency?: string;
};

export const DataCell = ({icon, label, value, fractions, currency}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={styles.labelText}>{label}</Text>
      <View style={styles.value}>
        <Text style={styles.valueText}>
          {value}
          {fractions && '.'}
        </Text>
        <Text style={styles.valueDecimalsText}>{fractions}</Text>
        <Text style={styles.valueText}> {currency}</Text>
      </View>
    </View>
  );
};

export const DataCellSeparator = () => <View style={styles.cellSeparator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrapper: {
    width: rem(44),
    height: rem(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(11),
    backgroundColor: COLORS.aliceBlue,
  },
  labelText: {
    marginTop: rem(10),
    ...font(12, 15, 'medium', 'secondary'),
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  value: {
    marginTop: rem(4),
    flexDirection: 'row',
  },
  valueText: {
    ...font(17, 20, 'bold', 'primaryDark'),
    textAlign: 'center',
  },
  valueDecimalsText: {
    ...font(10, 12, 'bold', 'primaryDark'),
  },
  cellSeparator: {
    width: 1,
    backgroundColor: COLORS.periwinkleGray,
    height: rem(60),
    marginHorizontal: rem(15),
  },
});
