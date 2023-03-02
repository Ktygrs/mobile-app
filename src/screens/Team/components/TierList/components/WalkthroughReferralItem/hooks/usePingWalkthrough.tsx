// SPDX-License-Identifier: BUSL-1.1

import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {COLORS} from '@constants/colors';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {PingIcon} from '@svg/PingIcon';
import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const WALKTHROUGH_ELEMENT_CONTAINER_PADDING = rem(20);
const BORDER_RADIUS = rem(20);

//TODO:combine with useEarningsWalkthrough
export const usePingWalkthrough = ({userId}: {userId: string}) => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData();
  const [elementData, setElementData] = useState<{
    pageX: number;
    pageY: number;
  }>();
  const elementRef = useRef<View>(null);

  useEffect(() => {
    if (elementData) {
      const top = elementData.pageY - WALKTHROUGH_ELEMENT_CONTAINER_PADDING * 2;
      const left =
        elementData.pageX - WALKTHROUGH_ELEMENT_CONTAINER_PADDING * 2;
      setWalkthroughElementData({
        stepKey: 'ping',
        elementData: {
          topPositionOfHighlightedElement: top,
          icon: (
            <PingIcon
              fill={COLORS.primaryDark}
              height={rem(16)}
              width={rem(16)}
            />
          ),
          renderStepHighlight: () => (
            <View style={[styles.outerContainer, {left}]}>
              <View style={[styles.innerContainer]}>
                <UserListPingButton userId={userId} />
              </View>
            </View>
          ),
        },
      });
    }
  }, [elementData, setWalkthroughElementData, userId]);

  const onElementLayout = () => {
    setTimeout(() => {
      elementRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setElementData({pageY, pageX});
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
    alignSelf: 'flex-start',
    //TODO:set to constants?
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white02opacity,
    padding: WALKTHROUGH_ELEMENT_CONTAINER_PADDING,
    justifyContent: 'center',
  },
  innerContainer: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white,
    padding: WALKTHROUGH_ELEMENT_CONTAINER_PADDING,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
