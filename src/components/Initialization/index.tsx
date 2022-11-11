// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {LogoIcon} from '@svg/LogoIcon';
import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const Initialization = () => {
  const spinValue = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue.current, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = spinValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, {transform: [{rotate: spin}]}]}>
        <LogoIcon color={COLORS.white} width={rem(47)} height={rem(47)} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: rem(70),
    height: rem(70),
    borderRadius: rem(70) / 2,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
