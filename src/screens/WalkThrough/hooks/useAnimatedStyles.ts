// SPDX-License-Identifier: BUSL-1.1

import {
  ANIMATION_CONFIG,
  ANIMATION_DELAY,
} from '@screens/WalkThrough/constants';
import {WalkThroughStep} from '@store/modules/WalkThrough/types';
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
  step,
  elementHeight,
}: {
  step: WalkThroughStep;
  elementHeight: number | undefined;
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
  }, [circleOpacity, elementHeight, elementOpacity, step]);

  const runCloseAnimation = useCallback(
    (cb: () => void) => {
      cancelAnimation(elementOpacity);
      cancelAnimation(circleOpacity);
      circleOpacity.value = withTiming(0, ANIMATION_CONFIG, () => {
        elementOpacity.value = withDelay(
          ANIMATION_DELAY,
          withTiming(0, ANIMATION_CONFIG, () => {
            runOnJS(cb)();
          }),
        );
      });
    },
    [elementOpacity, circleOpacity],
  );

  return {elementAnimatedStyle, circleAnimatedStyle, runCloseAnimation};
};
