// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {AllowContactsButton} from '@screens/Team/components/Contacts/components/ContactsPermissions/components/AllowContactsButton';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {AddressBookIcon} from '@svg/AddressBookIcon';
import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const WALKTHROUGH_ELEMENT_CONTAINER_PADDING = rem(20);

export const useAllowContactsWalkthrough = () => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData('team');
  const [allowContactButtonY, setAllowContactButtonY] = useState(0);
  const allowContactsButtonRef = useRef<View>(null);

  useEffect(() => {
    if (allowContactButtonY) {
      const top =
        allowContactButtonY - WALKTHROUGH_ELEMENT_CONTAINER_PADDING * 2;
      setWalkthroughElementData({
        step: 'allowContactsButton',
        elementData: {
          topPositionOfHighlightedElement: top,
          //TODO:walk set icon statically?
          icon: <AddressBookIcon color={COLORS.primaryLight} />,
          renderStepHighlight: () => (
            <View style={[styles.outerContainer, {top}]}>
              <View style={styles.innerContainer}>
                <AllowContactsButton />
              </View>
            </View>
          ),
        },
      });
    }
  }, [setWalkthroughElementData, allowContactButtonY]);

  const onAllowContactsButtonLayout = () => {
    /**
     * Small timeout before measure because the content of the screen is wrapped with
     * BottomSheetScrollView and on Layout the button position is different
     */
    setTimeout(() => {
      allowContactsButtonRef.current?.measure(
        (x, y, width, height, pageX, pageY) => {
          setAllowContactButtonY(pageY);
        },
      );
    }, 500);
  };

  return {
    onAllowContactsButtonLayout,
    allowContactsButtonRef,
  };
};

const styles = StyleSheet.create({
  outerContainer: {
    alignSelf: 'center',
    borderRadius: rem(20),
    backgroundColor: COLORS.white02opacity,
    padding: WALKTHROUGH_ELEMENT_CONTAINER_PADDING,
  },
  innerContainer: {
    borderRadius: rem(20),
    backgroundColor: COLORS.white,
    padding: WALKTHROUGH_ELEMENT_CONTAINER_PADDING,
  },
});
