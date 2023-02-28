// SPDX-License-Identifier: BUSL-1.1

import {
  DEFAULT_CONTAINER_MARGIN,
  SEGMENTED_CONTROL_HEIGHT,
  styles as segmentedControlStyles,
} from '@components/SegmentedControl';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {SEGMENTS} from '@screens/Team/components/SegmentedContent/segments';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {Indicator} from '@svg/Indicator';
import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem, screenWidth} from 'rn-units';

export const useSegmentedControlWalkthrough = () => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData('team');
  const [elementY, setElementY] = useState(0);
  const elementRef = useRef<View>(null);

  useEffect(() => {
    const top = elementY;
    const widthStyle = {width: `${100 / SEGMENTS.length}%`};
    SEGMENTS.forEach((segmentData, index) => {
      const sectionWidth =
        screenWidth - SCREEN_SIDE_OFFSET * 2 - DEFAULT_CONTAINER_MARGIN * 2;
      const leftStyle = {left: (sectionWidth / SEGMENTS.length) * index};
      setWalkthroughElementData({
        step: segmentData.key.toLowerCase() as Lowercase<
          typeof segmentData['key']
        >,
        elementData: {
          topPositionOfHighlightedElement: top,
          icon: segmentData.renderIcon(false),
          renderStepHighlight: () => (
            <View style={[styles.outerContainer, {top}]}>
              <View style={[styles.innerContainer, widthStyle, leftStyle]}>
                <View
                  style={[segmentedControlStyles.indicator, styles.indicator]}>
                  <Indicator
                    width={'100%'}
                    height={'100%'}
                    preserveAspectRatio="none"
                  />
                </View>
                {segmentData.renderText(true)}
              </View>
            </View>
          ),
        },
      });
    });
  }, [setWalkthroughElementData, elementY]);

  const onElementLayout = () => {
    elementRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setElementY(pageY);
    });
  };

  return {
    onElementLayout,
    elementRef,
  };
};

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    borderRadius: rem(20),
    backgroundColor: COLORS.white02opacity,
    paddingHorizontal: DEFAULT_CONTAINER_MARGIN,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: rem(20),
    backgroundColor: COLORS.white,
    padding: rem(16),
    height: SEGMENTED_CONTROL_HEIGHT,
  },
  indicator: {
    width: '100%',
  },
});
