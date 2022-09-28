// SPDX-License-Identifier: BUSL-1.1

import {Bar} from '@components/BarGraph/components/Bar';
import {useScreenTransitionEnd} from '@navigation/hooks/useScreenTransitionEnd';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  data: {label: string; value: number}[];
};

const Y_AXIS_WIDTH = rem(36);
const X_AXIS_HEIGHT = rem(20);
const ROW_HEIGHT = rem(28);
const NUMBER_OF_STEPS_X = 8;

export const getBarGraphHeight = (numberOfRows: number) => {
  return X_AXIS_HEIGHT + numberOfRows * ROW_HEIGHT;
};

export const BarGraph = ({data}: Props) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const stepValue = Math.ceil(maxValue / NUMBER_OF_STEPS_X);
  const lastXValue = stepValue * NUMBER_OF_STEPS_X;

  const {transitionEnd} = useScreenTransitionEnd();

  return (
    <View>
      {data.map(item => {
        const valuePerc = (item.value * 100) / lastXValue;
        return (
          <View style={styles.row} key={item.label}>
            {valuePerc && <Text style={styles.yAxisText}>{item.label}</Text>}
            <Bar
              valuePerc={valuePerc}
              value={item.value}
              active={transitionEnd}
            />
          </View>
        );
      })}
      <View style={styles.xAxis}>
        {Array(NUMBER_OF_STEPS_X)
          .fill(null)
          .map((_, i) => (
            <Text key={i} style={styles.xAxisText}>
              {stepValue * i}
            </Text>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ROW_HEIGHT,
  },
  yAxisText: {
    width: Y_AXIS_WIDTH,
    ...font(10, 12, 'medium', 'periwinkleGray'),
  },
  xAxis: {
    height: X_AXIS_HEIGHT,
    marginLeft: Y_AXIS_WIDTH,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  xAxisText: {
    flex: 1,
    ...font(10, 12, 'medium', 'periwinkleGray'),
  },
});
