// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {PingIcon} from '@svg/PingIcon';
import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const BORDER_RADIUS = rem(20);
const OUTER_VERTICAL_PADDING = rem(16);
const INNER_VERTICAL_PADDING = 0;

export const useContactsListWalkthrough = ({
  sections,
  renderItem,
  renderSectionHeader,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sections: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderItem: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderSectionHeader: any;
}) => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData();
  const [elementData, setElementData] = useState<{
    pageY: number;
  }>();
  const elementRef = useRef<View>(null);

  useEffect(() => {
    if (elementData) {
      const top =
        elementData.pageY - INNER_VERTICAL_PADDING - OUTER_VERTICAL_PADDING;
      setWalkthroughElementData({
        stepKey: 'contactsList',
        elementData: {
          topPositionOfHighlightedElement: top,
          icon: (
            //TODO: fix icon
            <PingIcon
              fill={COLORS.primaryDark}
              height={rem(16)}
              width={rem(16)}
            />
          ),
          renderStepHighlight: () => (
            <View style={styles.outerContainer}>
              <View style={[styles.innerContainer]} pointerEvents={'none'}>
                <SectionList
                  sections={sections}
                  renderItem={renderItem}
                  renderSectionHeader={renderSectionHeader}
                />
              </View>
            </View>
          ),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementData, setWalkthroughElementData]);

  const onElementLayout = () => {
    setTimeout(() => {
      elementRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setElementData({pageY});
      });
    }, 500);
  };

  return {
    elementRef,
    onElementLayout,
  };
};

const styles = StyleSheet.create({
  outerContainer: {
    //TODO:set to constants?
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white02opacity,
    paddingVertical: OUTER_VERTICAL_PADDING,
    marginLeft: -SCREEN_SIDE_OFFSET / 2,
    marginRight: -SCREEN_SIDE_OFFSET / 2,
  },
  innerContainer: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white,
    paddingHorizontal: SCREEN_SIDE_OFFSET / 2,
    marginHorizontal: SCREEN_SIDE_OFFSET,
    paddingVertical: INNER_VERTICAL_PADDING,
    paddingTop: rem(16),
  },
});
