// SPDX-License-Identifier: BUSL-1.1

import {
  ANIMATION_CONFIG,
  ANIMATION_DELAY,
} from '@screens/WalkThrough/constants';
import {useCallback, useEffect} from 'react';
import {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export const useAnimatedStyles = ({
  elementHeight,
  closeAnimationCallback,
}: {
  elementHeight: number | undefined;
  closeAnimationCallback: () => void;
}) => {
  const elementOpacity = useSharedValue(0);
  const circleOpacity = useSharedValue(0);

  const elementAnimatedStyle = useAnimatedStyle(() => ({
    opacity: elementOpacity.value,
  }));
  const circleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: circleOpacity.value,
  }));

  useEffect(() => {
    return () => {
      cancelAnimation(elementOpacity);
      cancelAnimation(circleOpacity);
    };
  }, [circleOpacity, elementOpacity]);

  useEffect(() => {
    if (elementHeight) {
      cancelAnimation(elementOpacity);
      cancelAnimation(circleOpacity);
      elementOpacity.value = withDelay(
        ANIMATION_DELAY,
        withTiming(1, ANIMATION_CONFIG, () => {
          circleOpacity.value = withDelay(
            ANIMATION_DELAY,
            withTiming(1, ANIMATION_CONFIG),
          );
        }),
      );
    }
  }, [circleOpacity, elementHeight, elementOpacity]);

  const runCloseAnimation = useCallback(() => {
    cancelAnimation(elementOpacity);
    cancelAnimation(circleOpacity);
    circleOpacity.value = withTiming(0, ANIMATION_CONFIG, () => {
      elementOpacity.value = withDelay(
        ANIMATION_DELAY,
        withTiming(0, ANIMATION_CONFIG, () => {
          runOnJS(closeAnimationCallback)();
        }),
      );
    });
  }, [elementOpacity, circleOpacity, closeAnimationCallback]);

  return {elementAnimatedStyle, circleAnimatedStyle, runCloseAnimation};
};
