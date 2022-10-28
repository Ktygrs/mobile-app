// SPDX-License-Identifier: BUSL-1.1

import {font} from '@utils/styles';
import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface TimeProps {
  time?: Date | string | null;
}

export const Time = ({time}: TimeProps) => {
  return <Text style={styles.timeLabel}>{dayjs(time).fromNow() || ''}</Text>;
};

const styles = StyleSheet.create({
  timeLabel: {
    position: 'absolute',
    right: -5,
    top: -5,
    textAlign: 'right',
    ...font(10, 12, 'regular', 'secondary'),
  },
});
