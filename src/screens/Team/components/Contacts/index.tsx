// SPDX-License-Identifier: BUSL-1.1

import {ConfirmPhoneNumberForm} from '@components/Forms/ConfirmPhoneNumberForm';
import {ModifyPhoneNumberForm} from '@components/Forms/ModifyPhoneNumberForm';
import {ContactsList} from '@screens/Team/components/Contacts/components/ContactsList';
import {ContactsPermissions} from '@screens/Team/components/Contacts/components/ContactsPermissions';
import {isPhoneNumberVerifiedSelector} from '@store/modules/Account/selectors';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {permissionSelector} from '@store/modules/Permissions/selectors';
import {phoneVerificationStepSelector} from '@store/modules/Validation/selectors';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type TContactsFlow =
  | 'ContactsPermissions'
  | 'ModifyPhoneNumber'
  | 'ConfirmPhoneNumber'
  | 'ContactsList';

type ContactsProps = {
  focused: boolean;
};

export const Contacts = ({focused}: ContactsProps) => {
  const dispatch = useDispatch();

  const hasContactsPermissions = useSelector(permissionSelector('contacts'));
  const isPhoneNumberVerified = useSelector(isPhoneNumberVerifiedSelector);
  const phoneVerificationStep = useSelector(phoneVerificationStepSelector);

  const currentScreen = useMemo(() => {
    if (!hasContactsPermissions) {
      return 'ContactsPermissions';
    } else if (isPhoneNumberVerified) {
      return 'ContactsList';
    } else if (phoneVerificationStep === 'phone') {
      return 'ModifyPhoneNumber';
    } else {
      return 'ConfirmPhoneNumber';
    }
  }, [hasContactsPermissions, isPhoneNumberVerified, phoneVerificationStep]);

  const [visibleFlow, setVisibleFlow] = useState<TContactsFlow>(currentScreen);

  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const showNewFlow = useCallback(
    (newVisibleFlow: TContactsFlow) => {
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setVisibleFlow(newVisibleFlow);
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    },
    [fadeAnimation],
  );

  const setScreen = useCallback(
    (screen: TContactsFlow) => {
      if (screen !== visibleFlow) {
        showNewFlow(screen);
      }
    },
    [showNewFlow, visibleFlow],
  );

  useEffect(() => {
    setScreen(currentScreen);
  }, [currentScreen, setScreen]);

  const requestContactsAccessPermissionPress = async () => {
    dispatch(PermissionsActions.GET_PERMISSIONS.START.create('contacts'));
  };

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnimation}]}>
      {visibleFlow === 'ContactsPermissions' && (
        <ContactsPermissions
          requestContactsAccessPermissionPress={
            requestContactsAccessPermissionPress
          }
        />
      )}
      {visibleFlow === 'ModifyPhoneNumber' && <ModifyPhoneNumberForm />}
      {visibleFlow === 'ConfirmPhoneNumber' && <ConfirmPhoneNumberForm />}
      {visibleFlow === 'ContactsList' && <ContactsList focused={focused} />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
