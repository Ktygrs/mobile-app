// SPDX-License-Identifier: BUSL-1.1

import {
  SEGMENTED_CONTROL_HEIGHT,
  SEGMENTED_CONTROL_HORIZONTAL_OFFSET,
} from '@components/SegmentedControl';
import {Segment} from '@components/SegmentedControl/components/Segment';
import {SegmentIndicator} from '@components/SegmentedControl/components/SegmentIndicator';
import {COLORS} from '@constants/colors';
import {SEGMENTS} from '@screens/Team/components/SegmentedContent/segments';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const OUTER_VERTICAL_PADDING = rem(16);
const OUTER_HORIZONTAL_PADDING = rem(16);
const INNER_VERTICAL_PADDING = rem(12);
const INNER_HORIZONTAL_PADDING = rem(20);

export const useSegmentedControlWalkthrough = () => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData('team');
  const [elementParams, setElementParams] = useState<{
    pageY: number;
    pageX: number;
    width: number;
  }>();
  const elementRef = useRef<View>(null);

  useEffect(() => {
    if (elementParams) {
      const top =
        elementParams.pageY - OUTER_VERTICAL_PADDING - INNER_VERTICAL_PADDING;
      SEGMENTS.forEach((segmentData, index) => {
        const sectionWidth =
          (elementParams.width - SEGMENTED_CONTROL_HORIZONTAL_OFFSET * 2) /
          SEGMENTS.length;
        const left =
          elementParams.pageX +
          sectionWidth * index -
          OUTER_HORIZONTAL_PADDING -
          INNER_HORIZONTAL_PADDING +
          SEGMENTED_CONTROL_HORIZONTAL_OFFSET;
        setWalkthroughElementData({
          step: segmentData.key.toLowerCase() as Lowercase<
            typeof segmentData['key']
          >,
          elementData: {
            topPositionOfHighlightedElement: top,
            icon: segmentData.renderIcon(false),
            renderStepHighlight: () => (
              <View style={[styles.outerContainer, {top, left}]}>
                <View style={styles.innerContainer}>
                  <View style={[styles.section, {width: sectionWidth}]}>
                    <SegmentIndicator />
                    <Segment active={true} segment={segmentData} />
                  </View>
                </View>
              </View>
            ),
          },
        });
      });
    }
  }, [setWalkthroughElementData, elementParams]);

  const onElementLayout = () => {
    /**
     * Small timeout before measure because the content of the screen is wrapped with
     * BottomSheetScrollView and on Layout the button position is different
     */
    setTimeout(() => {
      elementRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setElementParams({pageY, pageX, width});
      });
    }, 500);
  };

  return {
    onElementLayout,
    elementRef,
  };
};

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: rem(20),
    paddingVertical: OUTER_VERTICAL_PADDING,
    paddingHorizontal: OUTER_HORIZONTAL_PADDING,
    backgroundColor: COLORS.white02opacity,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  innerContainer: {
    borderRadius: rem(20),
    paddingVertical: INNER_VERTICAL_PADDING,
    paddingHorizontal: INNER_HORIZONTAL_PADDING,
    backgroundColor: COLORS.white,
  },
  section: {
    height: SEGMENTED_CONTROL_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
