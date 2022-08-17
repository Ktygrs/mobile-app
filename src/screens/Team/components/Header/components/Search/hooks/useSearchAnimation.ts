// SPDX-License-Identifier: BUSL-1.1

import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const useSearchAnimation = ({
  searchShared,
  cancelWidth,
}: {
  searchShared: SharedValue<number>;
  cancelWidth: number;
}) => {
  const animatedContainerStyle = useAnimatedStyle(
    () => ({
      marginRight: interpolate(searchShared.value, [0, 1], [0, cancelWidth]),
    }),
    [cancelWidth],
  );
  const animatedCancelStyle = useAnimatedStyle(() => ({
    opacity: searchShared.value,
  }));

  return {animatedContainerStyle, animatedCancelStyle};
};
