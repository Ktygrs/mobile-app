// SPDX-License-Identifier: BUSL-1.1

import {Country} from '@constants/countries';
import {modalOptions, screenOptions} from '@navigation/options';
import {getCurrentRoute} from '@navigation/utils';
import {useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {ConfirmEmailLink} from '@screens/AuthFlow/ConfirmEmailLink';
import {ConfirmPhone} from '@screens/AuthFlow/ConfirmPhone';
import {SignIn} from '@screens/AuthFlow/SignIn';
import {CountrySelect} from '@screens/Dialogs/CountrySelect';
import {ErrorPopUp} from '@screens/PopUps/Error';
import {
  emailVerificationStepSelector,
  phoneVerificationStepSelector,
} from '@store/modules/Validation/selectors';
import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';

export type AuthStackParamList = {
  SignIn: undefined;
  ConfirmEmailLink: undefined;
  ConfirmPhone: undefined;
  CountrySelect: {
    onSelect: (country: Country) => void;
  };
  ErrorPopUp: {message: string};
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  const emailVerificationStep = useSelector(emailVerificationStepSelector);
  const phoneVerificationStep = useSelector(phoneVerificationStepSelector);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const getAuthRoute = useCallback(() => {
    if (emailVerificationStep === 'code') {
      return 'ConfirmEmailLink';
    }
    if (phoneVerificationStep === 'code') {
      return 'ConfirmPhone';
    }
    return 'SignIn';
  }, [emailVerificationStep, phoneVerificationStep]);

  useEffect(() => {
    const authRoute = getAuthRoute();
    if (getCurrentRoute()?.name !== authRoute) {
      navigation.navigate(authRoute);
    }
  }, [getAuthRoute, navigation]);

  return (
    <AuthStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={getAuthRoute()}>
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="ConfirmEmailLink" component={ConfirmEmailLink} />
      <AuthStack.Screen name="ConfirmPhone" component={ConfirmPhone} />
      <AuthStack.Screen
        name="CountrySelect"
        options={{presentation: 'modal'}}
        component={CountrySelect}
      />
      <AuthStack.Screen
        name="ErrorPopUp"
        component={ErrorPopUp}
        options={modalOptions}
      />
    </AuthStack.Navigator>
  );
}
