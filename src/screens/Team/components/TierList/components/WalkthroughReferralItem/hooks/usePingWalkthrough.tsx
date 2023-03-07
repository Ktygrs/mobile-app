// SPDX-License-Identifier: BUSL-1.1

import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {WalkThroughElementContainer} from '@screens/WalkThrough/components/WalkThroughElementContainer';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {useRef} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const CONTAINER_PADDING = rem(20);

export const usePingWalkthrough = ({userId}: {userId: string}) => {
  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const onElementLayout = () => {
    setWalkthroughElementData({
      stepKey: 'ping',
      elementData: {
        getRef: () => elementRef,
        getTop: measurements => {
          return measurements.pageY - CONTAINER_PADDING * 2;
        },
        render: measurements => {
          const left = measurements.pageX - CONTAINER_PADDING * 2;
          return (
            <WalkThroughElementContainer
              outerStyle={[styles.outerContainer, {left}]}
              innerStyle={styles.innerContainer}>
              <UserListPingButton userId={userId} />
            </WalkThroughElementContainer>
          );
        },
      },
    });
  };

  return {
    elementRef,
    onElementLayout,
  };
};

const styles = StyleSheet.create({
  outerContainer: {
    alignSelf: 'flex-start',
    padding: CONTAINER_PADDING,
    justifyContent: 'center',
  },
  innerContainer: {
    padding: CONTAINER_PADDING,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
