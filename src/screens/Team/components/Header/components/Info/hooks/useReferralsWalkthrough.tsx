// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {ReferralsCell} from '@screens/Team/components/Header/components/Info/components/ReferralsCell';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {TeamInactiveIcon} from '@svg/TeamInactiveIcon';
import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const WALKTHROUGH_ELEMENT_CONTAINER_PADDING = rem(16);
const BORDER_RADIUS = rem(20);

export const useReferralsWalkthrough = () => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData('team');
  const [elementY, setElementY] = useState(0);
  const elementRef = useRef<View>(null);

  useEffect(() => {
    const color = COLORS.primaryDark;
    const top = elementY - WALKTHROUGH_ELEMENT_CONTAINER_PADDING * 2;
    setWalkthroughElementData({
      step: 'referrals',
      elementData: {
        topPositionOfHighlightedElement: top,
        icon: (
          <TeamInactiveIcon width={rem(32)} height={rem(32)} color={color} />
        ),
        renderStepHighlight: () => (
          <View style={[styles.outerContainer, {top}]}>
            <View style={styles.innerContainer}>
              <ReferralsCell color={color} />
            </View>
          </View>
        ),
      },
    });
  }, [elementY, setWalkthroughElementData]);

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
    alignSelf: 'flex-start',
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white02opacity,
    paddingVertical: WALKTHROUGH_ELEMENT_CONTAINER_PADDING,
    paddingHorizontal: SCREEN_SIDE_OFFSET / 2,
    marginHorizontal: SCREEN_SIDE_OFFSET / 2,
    justifyContent: 'center',
  },
  innerContainer: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white,
    paddingVertical: WALKTHROUGH_ELEMENT_CONTAINER_PADDING,
    paddingHorizontal: rem(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
