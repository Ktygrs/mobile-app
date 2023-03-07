// SPDX-License-Identifier: BUSL-1.1

import {
  SEGMENTED_CONTROL_HEIGHT,
  SegmentedControl,
} from '@components/SegmentedControl';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {ContactsListDummy} from '@screens/Team/components/Contacts/components/ContactsList';
import {SEARCH_INPUT_TOP_OFFSET} from '@screens/Team/components/Header/components/Search';
import {SEGMENTED_CONTROL_PADDING_TOP} from '@screens/Team/components/SegmentedContent';
import {SEGMENTS} from '@screens/Team/components/SegmentedContent/segments';
import {WalkThroughElementContainer} from '@screens/WalkThrough/components/WalkThroughElementContainer';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {useRef} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {rem} from 'rn-units';

const OUTER_CONTAINER_VERTICAL_PADDING = rem(16);

export const useContactsListWalkthrough = () => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const elementRef = useRef<View>(null);

  const {top: topInset} = useSafeAreaInsets();

  const onElementLayout = () => {
    setWalkthroughElementData({
      stepKey: 'contactsList',
      elementData: {
        getRef: () => elementRef,
        getTop: () => {
          return (
            topInset +
            SEARCH_INPUT_TOP_OFFSET -
            OUTER_CONTAINER_VERTICAL_PADDING
          );
        },
        render: () => (
          <WalkThroughElementContainer
            outerStyle={styles.outerContainer}
            innerStyle={styles.innerContainer}
            pointerEvents={'none'}>
            <ContactsListDummy containerStyle={styles.contactList} />
            <View style={styles.segmentedControl}>
              <SegmentedControl segments={SEGMENTS} initialIndex={0} />
            </View>
          </WalkThroughElementContainer>
        ),
      },
    });
  };

  return {
    onElementLayout,
  };
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: OUTER_CONTAINER_VERTICAL_PADDING,
  },
  innerContainer: {
    marginLeft: SCREEN_SIDE_OFFSET / 2,
    marginRight: SCREEN_SIDE_OFFSET / 2,
    paddingTop: SEGMENTED_CONTROL_PADDING_TOP + SEGMENTED_CONTROL_HEIGHT,
  },
  contactList: {
    paddingHorizontal: SCREEN_SIDE_OFFSET / 2,
  },
  segmentedControl: {
    position: 'absolute',
    top: SEGMENTED_CONTROL_PADDING_TOP,
    right: SCREEN_SIDE_OFFSET / 2,
    left: SCREEN_SIDE_OFFSET / 2,
  },
});
