// SPDX-License-Identifier: BUSL-1.1

import {ReferralType} from '@api/user/types';
import {ActiveUsers} from '@screens/Team/components/TierList/components/Header/components/ActiveUsers';
import {WalkThroughElementContainer} from '@screens/WalkThrough/components/WalkThroughElementContainer';
import {useMeasureWalkthroughElement} from '@store/modules/WalkThrough/hooks/useMeasureWalkthroughElement';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {useEffect} from 'react';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

const WALKTHROUGH_ELEMENT_CONTAINER_PADDING = rem(20);

export const useActiveUsersWalkthrough = ({
  referralType,
  focused,
}: {
  referralType: ReferralType;
  focused: boolean;
}) => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const {elementRef, elementData, measureElement} =
    useMeasureWalkthroughElement();

  useEffect(() => {
    if (focused && referralType === 'T1') {
      measureElement();
    }
  }, [focused, measureElement, referralType]);

  useEffect(() => {
    if (elementData) {
      const top = elementData.pageY - WALKTHROUGH_ELEMENT_CONTAINER_PADDING * 2;
      const left =
        elementData.pageX - WALKTHROUGH_ELEMENT_CONTAINER_PADDING * 2;
      setWalkthroughElementData({
        stepKey: 'activeUsers',
        elementData: {
          top,
          render: () => (
            <WalkThroughElementContainer
              outerStyle={[styles.outerContainer, {left}]}
              innerStyle={styles.innerContainer}>
              <ActiveUsers referralType={referralType} />
            </WalkThroughElementContainer>
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
    padding: WALKTHROUGH_ELEMENT_CONTAINER_PADDING,
    justifyContent: 'center',
  },
  innerContainer: {
    padding: WALKTHROUGH_ELEMENT_CONTAINER_PADDING,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
