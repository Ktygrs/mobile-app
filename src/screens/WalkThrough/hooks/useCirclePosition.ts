// SPDX-License-Identifier: BUSL-1.1

import {
  CIRCLE_DIAMETER,
  CIRCLE_PADDING_VERTICAL,
} from '@screens/WalkThrough/constants';
import {WalkThroughStep} from '@store/modules/WalkThrough/types';
import {useMemo} from 'react';
import {rem, screenHeight} from 'rn-units/index';

type Props = {
  elementHeight?: number;
  elementData: undefined | WalkThroughStep['elementData'];
};

export function useCirclePosition({elementHeight, elementData}: Props) {
  return useMemo(() => {
    if (elementData && elementHeight) {
      const aboveSpace = elementData.topPositionOfHighlightedElement;
      const belowSpace =
        screenHeight -
        elementData.topPositionOfHighlightedElement -
        elementHeight;
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
          elementData.topPositionOfHighlightedElement + elementHeight;
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
  }, [elementHeight, elementData]);
}
