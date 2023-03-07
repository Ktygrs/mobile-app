// SPDX-License-Identifier: BUSL-1.1

import {AllowContactsButton} from '@screens/Team/components/Contacts/components/ContactsPermissions/components/AllowContactsButton';
import {WalkThroughElementContainer} from '@screens/WalkThrough/components/WalkThroughElementContainer';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {useEffect, useRef} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

const CONTAINER_PADDING = rem(20);

export const useAllowContactsWalkthrough = () => {
  const dispatch = useDispatch();

  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const hasContactsPermissions = useSelector(
    isPermissionGrantedSelector('contacts'),
  );

  useEffect(() => {
    if (hasContactsPermissions) {
      dispatch(WalkThroughActions.RESTART_WALK_THROUGH.STATE.create());
    }
  }, [dispatch, hasContactsPermissions]);

  const onElementLayout = () => {
    setWalkthroughElementData({
      stepKey: 'allowContacts',
      elementData: {
        getRef: () => elementRef,
        getTop: measurements => measurements.pageY - CONTAINER_PADDING * 2,
        render: () => (
          <WalkThroughElementContainer
            outerStyle={styles.outerContainer}
            innerStyle={styles.innerContainer}>
            <AllowContactsButton />
          </WalkThroughElementContainer>
        ),
      },
    });
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
