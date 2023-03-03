// SPDX-License-Identifier: BUSL-1.1

import {ReferralType} from '@api/user/types';
import {COLORS} from '@constants/colors';
import {Earnings} from '@screens/Team/components/TierList/components/Header/components/Earnings';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const WALKTHROUGH_ELEMENT_CONTAINER_PADDING = rem(20);
const BORDER_RADIUS = rem(20);

export const useEarningsWalkthrough = ({
  referralType,
  focused,
}: {
  referralType: ReferralType;
  focused: boolean;
}) => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData();
  const [elementData, setElementData] = useState<{
    pageX: number;
    pageY: number;
  }>();
  const elementRef = useRef<View>(null);

  useEffect(() => {
    if (focused && referralType === 'T1') {
      setTimeout(() => {
        elementRef.current?.measure((x, y, width, height, pageX, pageY) => {
          setElementData({pageY, pageX});
        });
      }, 500);
    }
  }, [focused, referralType]);

  useEffect(() => {
    if (elementData) {
      const top = elementData.pageY - WALKTHROUGH_ELEMENT_CONTAINER_PADDING * 2;
      const left =
        elementData.pageX - WALKTHROUGH_ELEMENT_CONTAINER_PADDING * 2;
      setWalkthroughElementData({
        stepKey: 'tierOneEarnings',
        elementData: {
          top,
          render: () => (
            <View style={[styles.outerContainer, {left}]}>
              <View style={[styles.innerContainer]}>
                <Earnings referralType={referralType} />
              </View>
            </View>
          ),
        },
      });
    }
  }, [elementData, referralType, setWalkthroughElementData]);

  return {
    elementRef,
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
