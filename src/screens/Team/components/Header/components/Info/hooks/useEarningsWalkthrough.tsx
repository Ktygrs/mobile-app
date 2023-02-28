// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {EarningsCell} from '@screens/Team/components/Header/components/Info/components/EarningsCell';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {WalletIcon} from '@svg/WalletIcon';
import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const WALKTHROUGH_ELEMENT_CONTAINER_PADDING = rem(16);
const BORDER_RADIUS = rem(20);

export const useEarningsWalkthrough = () => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData('team');
  const [elementY, setElementY] = useState(0);
  const elementRef = useRef<View>(null);

  useEffect(() => {
    const color = COLORS.primaryDark;
    const top = elementY - WALKTHROUGH_ELEMENT_CONTAINER_PADDING * 2;
    setWalkthroughElementData({
      step: 'earnings',
      elementData: {
        topPositionOfHighlightedElement: top,
        icon: <WalletIcon width={rem(20)} height={rem(20)} color={color} />,
        renderStepHighlight: () => (
          <View style={[styles.outerContainer, {top}]}>
            <View style={styles.innerContainer}>
              <EarningsCell color={color} />
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
    alignSelf: 'flex-end',
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
