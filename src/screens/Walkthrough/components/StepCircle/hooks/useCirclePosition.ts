// SPDX-License-Identifier: BUSL-1.1

import {
  CIRCLE_DIAMETER,
  MAX_CIRCLE_OFFSCREEN,
} from '@screens/Walkthrough/constants';
import {useMemo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {rem, screenHeight} from 'rn-units/index';

type Props = {
  elementHeight?: number;
  elementTop?: number;
  circlePosition?: 'top' | 'bottom';
};

export function useCirclePosition({
  elementHeight,
  elementTop,
  circlePosition,
}: Props) {
  const {top: topInset, bottom: bottomInset} = useSafeAreaInsets();
  return useMemo(() => {
    if (elementTop && elementHeight) {
      const aboveSpace = elementTop;
      const belowSpace = screenHeight - elementTop - elementHeight;

      const position =
        circlePosition ?? (aboveSpace > belowSpace ? 'top' : 'bottom');

      if (position === 'top') {
        if (CIRCLE_DIAMETER < aboveSpace) {
          return {
            top:
              aboveSpace -
              CIRCLE_DIAMETER -
              Math.min(rem(10), aboveSpace - CIRCLE_DIAMETER),
          };
        } else {
          return {top: -MAX_CIRCLE_OFFSCREEN + topInset};
        }
      } else {
        if (CIRCLE_DIAMETER < belowSpace) {
          return {
            top:
              elementTop +
              elementHeight +
              Math.min(rem(10), belowSpace - CIRCLE_DIAMETER),
          };
        } else {
          return {bottom: -MAX_CIRCLE_OFFSCREEN + bottomInset};
        }
      }
    }
  }, [elementTop, elementHeight, circlePosition, topInset, bottomInset]);
}
