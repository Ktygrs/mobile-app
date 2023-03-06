// SPDX-License-Identifier: BUSL-1.1

import {AllowContactsButton} from '@screens/Team/components/Contacts/components/ContactsPermissions/components/AllowContactsButton';
import {WalkThroughElementContainer} from '@screens/WalkThrough/components/WalkThroughElementContainer';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const CONTAINER_PADDING = rem(20);

export const useAllowContactsWalkthrough = () => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData();
  const [elementY, setElementY] = useState(0);
  const elementRef = useRef<View>(null);

  useEffect(() => {
    if (elementY) {
      const top = elementY - CONTAINER_PADDING * 2;
      setWalkthroughElementData({
        stepKey: 'allowContacts',
        elementData: {
          top,
          render: () => (
            <WalkThroughElementContainer
              outerStyle={styles.outerContainer}
              innerStyle={styles.innerContainer}>
              <AllowContactsButton />
            </WalkThroughElementContainer>
          ),
        },
      });
    }
  }, [setWalkthroughElementData, setElementY, elementY]);

  const onElementLayout = () => {
    /**
     * Small timeout before measure because the content of the screen is wrapped with
     * BottomSheetScrollView and on Layout the button position is different
     */
    setTimeout(() => {
      elementRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setElementY(pageY);
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
    alignSelf: 'center',
    padding: CONTAINER_PADDING,
  },
  innerContainer: {
    padding: CONTAINER_PADDING,
  },
});
