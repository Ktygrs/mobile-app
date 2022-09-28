// SPDX-License-Identifier: BUSL-1.1

import {BarLabel} from '@components/BarGraph/components/BarLabel';
import {COLORS} from '@constants/colors';
import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  valuePerc: number;
  value: number;
  active: boolean;
};

export const Bar = ({valuePerc, value, active}: Props) => {
  const isLabelOutside = valuePerc < 20;
  const play = useSharedValue(false);
  const progress = useDerivedValue(() => {
    return play.value ? withTiming(valuePerc, {duration: 600}) : 0;
  });
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));
  const backgroundColor = useMemo(() => {
    const red = 100 - Math.round((60 * valuePerc) / 100);
    const green = 200 - Math.round((90 * valuePerc) / 100);
    return StyleSheet.create({
      // eslint-disable-next-line react-native/no-unused-styles
      current: {
        backgroundColor: `rgba(${red},${green},255,1)`,
      },
    });
  }, [valuePerc]);

  useEffect(() => {
    if (active) {
      play.value = true;
    }
  }, [active, play]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.bar, backgroundColor.current, animatedStyle]}>
        {!isLabelOutside && active && (
          <BarLabel value={value} color={COLORS.white} />
        )}
      </Animated.View>
      {isLabelOutside && active && (
        <BarLabel value={value} color={COLORS.primaryLight} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  bar: {
    height: rem(24),
    borderRadius: rem(10),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
