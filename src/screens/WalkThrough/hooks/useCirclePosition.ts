// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughData} from '@contexts/WalkThroughContext';
import {
  CIRCLE_DIAMETER,
  CIRCLE_PADDING_VERTICAL,
} from '@screens/WalkThrough/constants';
import {useMemo} from 'react';
import {rem, screenHeight} from 'rn-units/index';

type Props = {
  elementHeight: number;
  stepData: null | WalkThroughData;
};

export function useCirclePosition({elementHeight, stepData}: Props) {
  return useMemo(() => {
    if (stepData && elementHeight) {
      const aboveSpace = stepData.topPositionOfHighlightedElement;
      const belowSpace =
        screenHeight - stepData.topPositionOfHighlightedElement - elementHeight;
      if (aboveSpace > belowSpace) {
        if (CIRCLE_DIAMETER < aboveSpace) {
          return (
            aboveSpace -
            CIRCLE_DIAMETER -
            Math.min(rem(10), aboveSpace - CIRCLE_DIAMETER)
          );
        } else {
          // CIRCLE_DIAMETER >= aboveSpace
          return Math.max(
            aboveSpace - CIRCLE_DIAMETER,
            -CIRCLE_PADDING_VERTICAL,
          );
        }
      } else {
        //  aboveSpace >= belowSpace
        const topStart =
          stepData.topPositionOfHighlightedElement + elementHeight;
        if (CIRCLE_DIAMETER < belowSpace) {
          return topStart + Math.min(rem(10), belowSpace - CIRCLE_DIAMETER);
        } else {
          // CIRCLE_DIAMETER >= belowSpace
          return (
            topStart -
            Math.min(CIRCLE_DIAMETER - belowSpace, CIRCLE_PADDING_VERTICAL)
          );
        }
      }
    }
  }, [elementHeight, stepData]);
}
