// SPDX-License-Identifier: BUSL-1.1

import {modalOptions, screenOptions} from '@navigation/options';
import {getCurrentRoute} from '@navigation/utils';
import {useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {Confirm, ConfirmButton} from '@screens/Dialogs/Confirm';
import {ErrorPopUp} from '@screens/PopUps/Error';
import {ClaimUsername} from '@screens/WelcomeFlow/ClaimUsername';
import {ConfirmEmailCode} from '@screens/WelcomeFlow/ConfirmEmailCode';
import {IceBonus} from '@screens/WelcomeFlow/IceBonus';
import {Onboarding} from '@screens/WelcomeFlow/Onboarding';
import {SetEmail} from '@screens/WelcomeFlow/SetEmail';
import {WhoInvitedYou} from '@screens/WelcomeFlow/WhoInvitedYou';
import {userSelector} from '@store/modules/Account/selectors';
import {emailVerificationStepSelector} from '@store/modules/Validation/selectors';
import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';

export type WelcomeStackParamList = {
  ClaimUsername: undefined;
  WhoInvitedYou: undefined;
  SetEmail: undefined;
  ConfirmEmailCode: undefined;
  IceBonus: undefined;
  Onboarding: undefined;
  ErrorPopUp: {message: string};
  Confirm: {
    title?: string;
    subtitle?: string;
    buttons?: ConfirmButton[];
  };
};

const WelcomeStack = createNativeStackNavigator<WelcomeStackParamList>();

export function WelcomeNavigator() {
  const user: ReturnType<typeof userSelector> = useSelector(userSelector);
  const emailVerificationStep = useSelector(emailVerificationStepSelector);
  const navigation =
    useNavigation<NativeStackNavigationProp<WelcomeStackParamList>>();
  const getWelcomeRoute = useCallback(() => {
    const finalizedSteps =
      user?.clientData?.registrationProcessFinalizedSteps ?? [];
    if (!finalizedSteps.includes('username')) {
      return 'ClaimUsername';
    } else if (!finalizedSteps.includes('referral')) {
      return 'WhoInvitedYou';
    } else if (!finalizedSteps.includes('email')) {
      return emailVerificationStep === 'email'
        ? 'SetEmail'
        : 'ConfirmEmailCode';
    } else if (!finalizedSteps.includes('iceBonus')) {
      return 'IceBonus';
    } else {
      return 'Onboarding';
    }
  }, [emailVerificationStep, user]);

  useEffect(() => {
    const authRoute = getWelcomeRoute();
    if (getCurrentRoute()?.name !== authRoute) {
      navigation.reset({index: 0, routes: [{name: authRoute}]});
    }
  }, [getWelcomeRoute, navigation]);

  return (
    <WelcomeStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={getWelcomeRoute()}>
      <WelcomeStack.Screen name="ClaimUsername" component={ClaimUsername} />
      <WelcomeStack.Screen name="WhoInvitedYou" component={WhoInvitedYou} />
      <WelcomeStack.Screen name="SetEmail" component={SetEmail} />
      <WelcomeStack.Screen
        name="ConfirmEmailCode"
        component={ConfirmEmailCode}
      />
      <WelcomeStack.Screen name="IceBonus" component={IceBonus} />
      <WelcomeStack.Screen name="Onboarding" component={Onboarding} />
      <WelcomeStack.Screen
        name="ErrorPopUp"
        component={ErrorPopUp}
        options={modalOptions}
      />
      <WelcomeStack.Screen
        name="Confirm"
        options={modalOptions}
        component={Confirm}
      />
    </WelcomeStack.Navigator>
  );
}
