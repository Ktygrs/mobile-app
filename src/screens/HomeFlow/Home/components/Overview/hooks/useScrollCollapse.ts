// SPDX-License-Identifier: BUSL-1.1

import {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const useScrollCollapse = ({
  translateY,
  fromHeight,
  toHeight,
}: {
  translateY: SharedValue<number>;
  fromHeight: number;
  toHeight: number;
}) => {
  const collapseAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        translateY.value,
        [0, fromHeight - toHeight],
        [fromHeight, toHeight],
        {extrapolateRight: Extrapolate.CLAMP},
      ),
    };
  });

  return {collapseAnimatedStyle};
};
