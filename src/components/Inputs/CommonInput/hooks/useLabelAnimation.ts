// SPDX-License-Identifier: BUSL-1.1

import {useEffect} from 'react';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useLabelAnimation = (isFocused: boolean, text?: string) => {
  const focusAnimation = useSharedValue(text ? 1 : 0);

  useEffect(() => {
    focusAnimation.value = withTiming(isFocused || text ? 1 : 0);
  }, [focusAnimation, isFocused, text]);

  const animatedStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(focusAnimation.value, [0, 1], [16, 12]),
    transform: [
      {
        translateY: interpolate(focusAnimation.value, [0, 1], [18, 6]),
      },
    ],
  }));

  return {animatedStyle};
};
