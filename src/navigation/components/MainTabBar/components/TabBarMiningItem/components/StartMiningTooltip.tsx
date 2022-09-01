// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {RoundedTriangle} from '@svg/RoundedTriangle';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  ZoomInEasyDown,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

export const StartMiningTooltip = () => {
  const bounceProgress = useSharedValue(0);
  const bounceAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(bounceProgress.value, [0, 0.5, 1], [0, -10, 0]),
      },
    ],
  }));

  const onEnteringAnimationEnds = () => {
    'worklet';
    bounceProgress.value = withRepeat(
      withDelay(1000, withTiming(1, {duration: 400})),
      -1,
    );
  };

  return (
    <Animated.View
      style={[styles.container, bounceAnimatedStyle]}
      entering={ZoomInEasyDown.delay(1000)
        .duration(600)
        .withCallback(onEnteringAnimationEnds)}
      exiting={FadeOut}>
      <Text style={styles.tooltipText}>{t('tabbar.mining_tooltip')}</Text>
      <RoundedTriangle
        fill={COLORS.downriver}
        style={styles.chevron}
        width={rem(16)}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.downriver,
    width: rem(200),
    paddingHorizontal: rem(20),
    paddingVertical: rem(11),
    borderRadius: rem(12),
    position: 'absolute',
    alignSelf: 'center',
    bottom: rem(110),
  },
  tooltipText: {
    textAlign: 'center',
    ...font(12, 15, 'black'),
  },
  chevron: {
    position: 'absolute',
    bottom: -rem(7),
    alignSelf: 'center',
    transform: [{rotate: '180deg'}],
  },
});
