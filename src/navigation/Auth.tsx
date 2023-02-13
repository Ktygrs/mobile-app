// SPDX-License-Identifier: BUSL-1.1

import {Country} from '@constants/countries';
import {modalOptions, screenOptions} from '@navigation/options';
import {getCurrentRoute, navigationReadyResolver} from '@navigation/utils';
import {useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {ConfirmEmailLink} from '@screens/AuthFlow/ConfirmEmailLink';
import {ConfirmPhone} from '@screens/AuthFlow/ConfirmPhone';
import {InvalidLink} from '@screens/AuthFlow/InvalidLink';
import {SignIn} from '@screens/AuthFlow/SignIn';
import {CountrySelect} from '@screens/Modals/CountrySelect';
import {PopUp, PopUpProps} from '@screens/Modals/PopUp';
import {
  emailVerificationStepSelector,
  phoneVerificationStepSelector,
} from '@store/modules/Validation/selectors';
import React, {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';

export type AuthStackParamList = {
  SignIn: undefined;
  ConfirmEmailLink: undefined;
  ConfirmPhone: undefined;
  CountrySelect: {
    onSelect: (country: Country) => void;
  };
  InvalidLink: undefined;
  PopUp: PopUpProps;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  const emailVerificationStep = useSelector(emailVerificationStepSelector);
  const phoneVerificationStep = useSelector(phoneVerificationStepSelector);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const authRoute = useMemo(() => {
    if (emailVerificationStep === 'code') {
      return 'ConfirmEmailLink';
    }
    if (phoneVerificationStep === 'code') {
      return 'ConfirmPhone';
    }
    return 'SignIn';
  }, [emailVerificationStep, phoneVerificationStep]);

  useEffect(() => {
    getCurrentRoute().then(route => {
      if (route?.name !== authRoute) {
        navigation.navigate(authRoute);
      }
    });
  }, [authRoute, navigation]);

  useEffect(navigationReadyResolver, []);

  return (
    <AuthStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={authRoute}>
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="ConfirmEmailLink" component={ConfirmEmailLink} />
      <AuthStack.Screen name="ConfirmPhone" component={ConfirmPhone} />
      <AuthStack.Screen
        name="CountrySelect"
        options={{presentation: 'modal'}}
        component={CountrySelect}
      />
      <AuthStack.Screen name="InvalidLink" component={InvalidLink} />
      <AuthStack.Screen name="PopUp" options={modalOptions} component={PopUp} />
    </AuthStack.Navigator>
  );
}
