// SPDX-License-Identifier: BUSL-1.1

import {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Params = {
  translateY: SharedValue<number>;
  transitionOffset: number;
};

const TRANSITION_WINDOW = rem(20);

export const useTransitionAnimation = ({
  translateY,
  transitionOffset,
}: Params) => {
  const fromAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [transitionOffset - TRANSITION_WINDOW, transitionOffset],
      [1, 0],
      Extrapolate.CLAMP,
    ),
  }));

  const toAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [transitionOffset, transitionOffset + TRANSITION_WINDOW],
      [0, 1],
      Extrapolate.CLAMP,
    ),
  }));

  return {fromAnimatedStyle, toAnimatedStyle};
};
