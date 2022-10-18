// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import React, {useEffect} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  valuePercentage: number;
  style?: StyleProp<ViewStyle>;
};

export const ProgressBar = ({valuePercentage, style}: Props) => {
  const progress = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  useEffect(() => {
    progress.value = withTiming(valuePercentage);
  }, [progress, valuePercentage]);

  return (
    <View style={[style, styles.container]}>
      <Animated.View style={[styles.value, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: rem(5),
    borderRadius: rem(4),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
  },
  value: {
    backgroundColor: COLORS.shamrock,
    borderRadius: rem(4),
  },
});
