// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {ReferralsCell} from '@screens/Team/components/Header/components/Info/components/ReferralsCell';
import {WalkThroughElementContainer} from '@screens/WalkThrough/components/WalkThroughElementContainer';
import {useMeasureWalkthroughElement} from '@store/modules/WalkThrough/hooks/useMeasureWalkthroughElement';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {useEffect} from 'react';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

const CONTAINER_VERTICAL_PADDING = rem(16);

export const useReferralsWalkthrough = () => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const {elementRef, elementData, measureElement} =
    useMeasureWalkthroughElement();

  useEffect(() => {
    if (elementData) {
      const top = elementData.pageY - CONTAINER_VERTICAL_PADDING * 2;
      setWalkthroughElementData({
        stepKey: 'referrals',
        elementData: {
          top,
          render: () => (
            <WalkThroughElementContainer
              outerStyle={styles.outerContainer}
              innerStyle={styles.innerContainer}>
              <ReferralsCell color={COLORS.primaryDark} />
            </WalkThroughElementContainer>
          ),
        },
      });
    }
  }, [elementData, setWalkthroughElementData]);

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
    alignSelf: 'flex-start',
    paddingVertical: CONTAINER_VERTICAL_PADDING,
    paddingHorizontal: SCREEN_SIDE_OFFSET / 2,
    marginHorizontal: SCREEN_SIDE_OFFSET / 2,
    justifyContent: 'center',
  },
  innerContainer: {
    paddingVertical: CONTAINER_VERTICAL_PADDING,
    paddingHorizontal: rem(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
