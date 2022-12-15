// SPDX-License-Identifier: BUSL-1.1

import {ConfirmPhoneNumberForm} from '@components/Forms/ConfirmPhoneNumberForm';
import {ModifyPhoneNumberForm} from '@components/Forms/ModifyPhoneNumberForm';
import {ContactsList} from '@screens/Team/components/Contacts/components/ContactsList';
import {ContactsPermissions} from '@screens/Team/components/Contacts/components/ContactsPermissions';
import {VerticalOffset} from '@screens/Team/components/Contacts/components/VerticalOffset';
import {useScreenFade} from '@screens/Team/components/Contacts/hooks/useScreenFade';
import {isPhoneNumberVerifiedSelector} from '@store/modules/Account/selectors';
import {permissionSelector} from '@store/modules/Permissions/selectors';
import {phoneVerificationStepSelector} from '@store/modules/Validation/selectors';
import React, {useMemo} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

type ContactsProps = {
  focused: boolean;
  offset: number;
};

export const Contacts = ({focused, offset}: ContactsProps) => {
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

  const {fadeStyle, visibleScreen} = useScreenFade(currentScreen);

  return (
    <Animated.View style={[styles.container, fadeStyle]}>
      {visibleScreen === 'ContactsPermissions' && (
        <ContactsPermissions offset={offset} />
      )}
      {visibleScreen === 'ModifyPhoneNumber' && (
        <VerticalOffset>
          <ModifyPhoneNumberForm />
        </VerticalOffset>
      )}
      {visibleScreen === 'ConfirmPhoneNumber' && (
        <VerticalOffset>
          <ConfirmPhoneNumberForm />
        </VerticalOffset>
      )}
      {visibleScreen === 'ContactsList' && <ContactsList focused={focused} />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
