// SPDX-License-Identifier: BUSL-1.1

import {useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {ErrorPopUp} from '@screens/PopUps/Error';
import {
  PROFILE_FILL_STEPS,
  ProfileFill,
} from '@screens/UserRegistrationFlow/ProfileFill';
import {SignIn} from '@screens/UserRegistrationFlow/SignIn';
import {Welcome} from '@screens/UserRegistrationFlow/Welcome';
import {userSelector} from '@store/modules/Auth/selectors';
import {difference} from 'lodash';
import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';

export type AuthStackParamList = {
  SignIn: undefined;
  ProfileFill: undefined;
  Welcome: undefined;
  ErrorPopUp: {message: string};
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const screenOptions = {
  headerShown: false,
};

export function AuthNavigator() {
  const user = useSelector(userSelector);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const getAuthRoute = useCallback(() => {
    const finalizedSteps =
      user?.clientData?.registrationProcessFinalizedSteps ?? [];
    if (!user) {
      return 'SignIn';
    } else if (difference(PROFILE_FILL_STEPS, finalizedSteps).length !== 0) {
      return 'ProfileFill';
    } else {
      return 'Welcome';
    }
  }, [user]);

  useEffect(() => {
    navigation.navigate(getAuthRoute());
  }, [getAuthRoute, navigation]);

  return (
    <AuthStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={getAuthRoute()}>
      <AuthStack.Screen name="ProfileFill" component={ProfileFill} />
      <AuthStack.Screen name="Welcome" component={Welcome} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen
        name="ErrorPopUp"
        component={ErrorPopUp}
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
        }}
      />
    </AuthStack.Navigator>
  );
}
