// SPDX-License-Identifier: BUSL-1.1

import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {WalkThroughElementContainer} from '@screens/WalkThrough/components/WalkThroughElementContainer';
import {useMeasureWalkthroughElement} from '@store/modules/WalkThrough/hooks/useMeasureWalkthroughElement';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {useEffect} from 'react';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

const CONTAINER_PADDING = rem(20);

export const usePingWalkthrough = ({userId}: {userId: string}) => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const {elementRef, elementData, measureElement} =
    useMeasureWalkthroughElement();

  useEffect(() => {
    if (elementData) {
      const top = elementData.pageY - CONTAINER_PADDING * 2;
      const left = elementData.pageX - CONTAINER_PADDING * 2;
      setWalkthroughElementData({
        stepKey: 'ping',
        elementData: {
          top,
          render: () => (
            <WalkThroughElementContainer
              outerStyle={[styles.outerContainer, {left}]}
              innerStyle={styles.innerContainer}>
              <UserListPingButton userId={userId} />
            </WalkThroughElementContainer>
          ),
        },
      });
    }
  }, [elementData, setWalkthroughElementData, userId]);

  const onElementLayout = () => {
    measureElement();
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
