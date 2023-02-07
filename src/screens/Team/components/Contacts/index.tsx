// SPDX-License-Identifier: BUSL-1.1

import {ConfirmPhoneNumberForm} from '@components/Forms/ConfirmPhoneNumberForm';
import {ModifyPhoneNumberForm} from '@components/Forms/ModifyPhoneNumberForm';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {ContactsList} from '@screens/Team/components/Contacts/components/ContactsList';
import {ContactsPermissions} from '@screens/Team/components/Contacts/components/ContactsPermissions';
import {VerticalOffset} from '@screens/Team/components/Contacts/components/VerticalOffset';
import {useScreenFade} from '@screens/Team/components/Contacts/hooks/useScreenFade';
import {isPhoneNumberVerifiedSelector} from '@store/modules/Account/selectors';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {
  phoneVerificationStepSelector,
  temporaryPhoneNumberSelector,
} from '@store/modules/Validation/selectors';
import {getCountryByPhoneNumber} from '@utils/phoneNumber';
import React, {useCallback, useEffect, useMemo} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type ContactsProps = {
  focused: boolean;
  addCollapsedSnapPointListener: (key: string, listener: () => void) => void;
};

export const Contacts = ({
  focused,
  addCollapsedSnapPointListener,
}: ContactsProps) => {
  const hasContactsPermissions = useSelector(
    isPermissionGrantedSelector('contacts'),
  );
  const isPhoneNumberVerified = useSelector(isPhoneNumberVerifiedSelector);
  const temporaryPhoneNumber = useSelector(temporaryPhoneNumberSelector);
  const temporaryPhoneVerificationStep = useSelector(
    phoneVerificationStepSelector,
  );

  const currentScreen = useMemo(() => {
    if (!hasContactsPermissions) {
      return 'ContactsPermissions';
    } else if (isPhoneNumberVerified) {
      return 'ContactsList';
    } else if (temporaryPhoneVerificationStep === 'phone') {
      return 'ModifyPhoneNumber';
    } else {
      return 'ConfirmPhoneNumber';
    }
  }, [
    hasContactsPermissions,
    isPhoneNumberVerified,
    temporaryPhoneVerificationStep,
  ]);

  const dispatch = useDispatch();
  const resetTempPhoneNumber = useCallback(() => {
    dispatch(ValidationActions.PHONE_VALIDATION.RESET.create());
  }, [dispatch]);
  const onModifyPhoneNumber = useCallback(() => {
    dispatch(
      ValidationActions.SET_TEMPORARY_PHONE_VERIFICATION_STEP.STATE.create({
        temporaryPhoneVerificationStep: 'phone',
      }),
    );
  }, [dispatch]);
  useEffect(() => {
    if (isPhoneNumberVerified && temporaryPhoneNumber) {
      resetTempPhoneNumber();
    }
  }, [
    temporaryPhoneNumber,
    isPhoneNumberVerified,
    dispatch,
    resetTempPhoneNumber,
  ]);

  const {fadeStyle, visibleScreen} = useScreenFade(currentScreen);

  if (visibleScreen === 'ContactsList') {
    return (
      <ContactsList
        focused={focused}
        addCollapsedSnapPointListener={addCollapsedSnapPointListener}
      />
    );
  }

  const countryByPhoneNumber = getCountryByPhoneNumber(temporaryPhoneNumber);

  return (
    <BottomSheetScrollView>
      <Animated.View style={[styles.container, fadeStyle]}>
        {visibleScreen === 'ContactsPermissions' && <ContactsPermissions />}
        {visibleScreen === 'ModifyPhoneNumber' && (
          <VerticalOffset>
            <ModifyPhoneNumberForm
              initialPhoneNumber={countryByPhoneNumber?.nationalNumber}
              selectedCountry={countryByPhoneNumber?.country}
            />
          </VerticalOffset>
        )}
        {visibleScreen === 'ConfirmPhoneNumber' && (
          <VerticalOffset>
            <ConfirmPhoneNumberForm
              onDoThisLater={resetTempPhoneNumber}
              onModifyPhoneNumber={onModifyPhoneNumber}
            />
          </VerticalOffset>
        )}
      </Animated.View>
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
