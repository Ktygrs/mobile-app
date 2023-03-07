// SPDX-License-Identifier: BUSL-1.1

import {AllowContactsButton} from '@screens/Team/components/Contacts/components/ContactsPermissions/components/AllowContactsButton';
import {WalkThroughElementContainer} from '@screens/WalkThrough/components/WalkThroughElementContainer';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import {useMeasureWalkthroughElement} from '@store/modules/WalkThrough/hooks/useMeasureWalkthroughElement';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {useEffect} from 'react';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

const CONTAINER_PADDING = rem(20);

export const useAllowContactsWalkthrough = () => {
  const dispatch = useDispatch();

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const {elementRef, elementData, measureElement} =
    useMeasureWalkthroughElement();

  const hasContactsPermissions = useSelector(
    isPermissionGrantedSelector('contacts'),
  );

  useEffect(() => {
    if (hasContactsPermissions) {
      dispatch(
        WalkThroughActions.COMPLETE_WALK_THROUGH_STEP.STATE.create({
          stepKey: 'allowContacts',
        }),
      );
    }
  }, [dispatch, hasContactsPermissions]);

  useEffect(() => {
    if (elementData) {
      const top = elementData.pageY - CONTAINER_PADDING * 2;
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
  }, [setWalkthroughElementData, elementData]);

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
    alignSelf: 'center',
    padding: CONTAINER_PADDING,
  },
  innerContainer: {
    padding: CONTAINER_PADDING,
  },
});
