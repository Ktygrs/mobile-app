// SPDX-License-Identifier: BUSL-1.1

import {getCurrentRoute} from '@navigation/utils';
import {useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {ClaimUsername} from '@screens/AuthFlow/ClaimUsername';
import {ConfirmEmail} from '@screens/AuthFlow/ConfirmEmail';
import {IceBonus} from '@screens/AuthFlow/IceBonus';
import {SetEmail} from '@screens/AuthFlow/SetEmail';
import {SignIn} from '@screens/AuthFlow/SignIn';
import {Welcome} from '@screens/AuthFlow/Welcome';
import {WhoInvitedYou} from '@screens/AuthFlow/WhoInvitedYou';
import {Confirm, ConfirmButton} from '@screens/Dialogs/Confirm';
import {ErrorPopUp} from '@screens/PopUps/Error';
import {userSelector} from '@store/modules/Auth/selectors';
import {emailVerificationStepSelector} from '@store/modules/Validation/selectors';
import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';

export type AuthStackParamList = {
  SignIn: undefined;
  ClaimUsername: undefined;
  WhoInvitedYou: undefined;
  SetEmail: undefined;
  ConfirmEmail: undefined;
  IceBonus: undefined;
  Welcome: undefined;
  ErrorPopUp: {message: string};
  Confirm: {
    title?: string;
    subtitle?: string;
    buttons?: ConfirmButton[];
  };
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const screenOptions = {
  headerShown: false,
};

const modalOptions: NativeStackNavigationOptions = {
  presentation: 'transparentModal',
  animation: 'fade',
} as const;

export function AuthNavigator() {
  const user: ReturnType<typeof userSelector> = useSelector(userSelector);
  const emailVerificationStep = useSelector(emailVerificationStepSelector);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const getAuthRoute = useCallback(() => {
    const finalizedSteps =
      user?.clientData?.registrationProcessFinalizedSteps ?? [];

    if (!user) {
      return 'SignIn';
    } else if (!finalizedSteps.includes('username')) {
      return 'ClaimUsername';
    } else if (!finalizedSteps.includes('referral')) {
      return 'WhoInvitedYou';
    } else if (!finalizedSteps.includes('email')) {
      return emailVerificationStep === 'email' ? 'SetEmail' : 'ConfirmEmail';
    } else if (!finalizedSteps.includes('iceBonus')) {
      return 'IceBonus';
    } else {
      return 'Welcome';
    }
  }, [emailVerificationStep, user]);

  useEffect(() => {
    const authRoute = getAuthRoute();
    if (getCurrentRoute()?.name !== authRoute) {
      navigation.reset({index: 0, routes: [{name: authRoute}]});
    }
  }, [getAuthRoute, navigation]);

  return (
    <AuthStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={getAuthRoute()}>
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="ClaimUsername" component={ClaimUsername} />
      <AuthStack.Screen name="WhoInvitedYou" component={WhoInvitedYou} />
      <AuthStack.Screen name="SetEmail" component={SetEmail} />
      <AuthStack.Screen name="ConfirmEmail" component={ConfirmEmail} />
      <AuthStack.Screen name="IceBonus" component={IceBonus} />
      <AuthStack.Screen name="Welcome" component={Welcome} />
      <AuthStack.Screen
        name="ErrorPopUp"
        component={ErrorPopUp}
        options={modalOptions}
      />
      <AuthStack.Screen
        name="Confirm"
        options={modalOptions}
        component={Confirm}
      />
    </AuthStack.Navigator>
  );
}
