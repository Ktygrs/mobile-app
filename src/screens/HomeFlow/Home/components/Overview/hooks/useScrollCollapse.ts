// SPDX-License-Identifier: BUSL-1.1

import {useState} from 'react';
import {
  Extrapolate,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
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
  const [isCollapsed, setCollapsed] = useState(false);

  const containerHeight = useDerivedValue(() => {
    return withTiming(
      interpolate(
        translateY.value,
        [0, fromHeight - toHeight],
        [fromHeight, toHeight],
        {
          extrapolateRight: Extrapolate.CLAMP,
        },
      ),
      {
        /**
         * HACK: issue with ScrollView.onScroll based animation. withTiming is redundant.
         * Looks like problem only with animating height/width.
         * Check https://github.com/software-mansion/react-native-reanimated/issues/1947
         */
        duration: 10,
      },
    );
  });

  useDerivedValue(() => {
    const newIsCollapsedValue = containerHeight.value <= toHeight;

    if (isCollapsed !== newIsCollapsedValue) {
      runOnJS(setCollapsed)(newIsCollapsedValue);
    }
  }, [isCollapsed, toHeight]);

  const collapseAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: containerHeight.value,
    };
  });

  return {
    isCollapsed,
    collapseAnimatedStyle,
  };
};
