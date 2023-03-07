// SPDX-License-Identifier: BUSL-1.1

import {
  SEGMENTED_CONTROL_HEIGHT,
  SEGMENTED_CONTROL_HORIZONTAL_OFFSET,
} from '@components/SegmentedControl';
import {Segment} from '@components/SegmentedControl/components/Segment';
import {SegmentIndicator} from '@components/SegmentedControl/components/SegmentIndicator';
import {COLORS} from '@constants/colors';
import {INFO_HEIGHT} from '@screens/Team/components/Header/components/Info';
import {SEARCH_HEIGHT} from '@screens/Team/components/Header/components/Search';
import {SEGMENTED_CONTROL_PADDING_TOP} from '@screens/Team/components/SegmentedContent';
import {SEGMENTS} from '@screens/Team/components/SegmentedContent/segments';
import {useMeasureWalkthroughElement} from '@store/modules/WalkThrough/hooks/useMeasureWalkthroughElement';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {useEffect} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {rem} from 'rn-units';

const OUTER_VERTICAL_PADDING = rem(16);
const OUTER_HORIZONTAL_PADDING = rem(16);
const INNER_VERTICAL_PADDING = rem(12);
const INNER_HORIZONTAL_PADDING = rem(20);

export const useSegmentedControlWalkthrough = () => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const {elementRef, elementData, measureElement} =
    useMeasureWalkthroughElement();

  const {top: topInset} = useSafeAreaInsets();

  useEffect(() => {
    if (elementData) {
      /**
       * Not using pageY since on layout pageY is incorrect because of BottomSheet
       */
      const top =
        topInset +
        SEARCH_HEIGHT +
        INFO_HEIGHT -
        OUTER_VERTICAL_PADDING -
        INNER_VERTICAL_PADDING +
        SEGMENTED_CONTROL_PADDING_TOP;
      SEGMENTS.forEach((segmentData, index) => {
        const stepKey = (
          {
            Contacts: null,
            TierOne: 'segmentedControlTierOne',
            TierTwo: 'segmentedControlTierTwo',
          } as const
        )[segmentData.key];

        if (!stepKey) {
          return;
        }

        const sectionWidth =
          (elementData.width - SEGMENTED_CONTROL_HORIZONTAL_OFFSET * 2) /
          SEGMENTS.length;
        const left =
          elementData.pageX +
          sectionWidth * index -
          OUTER_HORIZONTAL_PADDING -
          INNER_HORIZONTAL_PADDING +
          SEGMENTED_CONTROL_HORIZONTAL_OFFSET;
        setWalkthroughElementData({
          stepKey,
          elementData: {
            top,
            render: () => (
              <View style={[styles.outerContainer, {left}]}>
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
  }, [elementData, setWalkthroughElementData, topInset]);

  const onElementLayout = () => {
    measureElement();
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
