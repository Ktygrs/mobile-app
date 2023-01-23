// SPDX-License-Identifier: BUSL-1.1

import {RegistrationProcessFinalizedStep} from '@api/user/types';
import {Initialization} from '@components/Initialization';
import {AuthNavigator} from '@navigation/Auth';
import {MainNavigator} from '@navigation/Main';
import {theme} from '@navigation/theme';
import {navigationRef} from '@navigation/utils';
import {WelcomeNavigator} from '@navigation/Welcome';
import {NavigationContainer} from '@react-navigation/native';
import {routingInstrumentation} from '@services/logging';
import {useUserChangedListener} from '@store/modules/Account/hooks/useUserChangedListener';
import {userSelector} from '@store/modules/Account/selectors';
import {useAppLoadedListener} from '@store/modules/AppCommon/hooks/useAppLoadedListener';
import {useAppStateListener} from '@store/modules/AppCommon/hooks/useAppStateListener';
import {isAppInitializedSelector} from '@store/modules/AppCommon/selectors';
import {useOpenUrlListener} from '@store/modules/Linking/hooks/useOpenUrlListener';
import {useGetstreamListener} from '@store/modules/Notifications/hooks/useGetstreamListener';
import {useInitNotifications} from '@store/modules/PushNotifications/hooks/useInitNotifications';
import {difference} from 'lodash';
import React, {useCallback} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {useSelector} from 'react-redux';

function ActiveNavigator() {
  const isAppInitialized = useSelector(isAppInitializedSelector);
  const user = useSelector(userSelector);
  const requiredAuthSteps: RegistrationProcessFinalizedStep[] = [
    'username',
    'referral',
    'email',
    'iceBonus',
    'onboarding',
  ];
  const finalizedAuthSteps =
    user?.clientData?.registrationProcessFinalizedSteps ?? [];

  if (!isAppInitialized) {
    return <Initialization />;
  }

  if (!user) {
    return <AuthNavigator />;
  }

  if (difference(requiredAuthSteps, finalizedAuthSteps).length !== 0) {
    return <WelcomeNavigator />;
  }

  return <MainNavigator />;
}

export function Router() {
  useAppLoadedListener();
  useAppStateListener();
  useGetstreamListener();
  useUserChangedListener();
  useOpenUrlListener();
  useInitNotifications();

  const onReady = useCallback(() => {
    routingInstrumentation.registerNavigationContainer(navigationRef);
    RNBootSplash.hide();
  }, []);

  return (
    <NavigationContainer ref={navigationRef} theme={theme} onReady={onReady}>
      <ActiveNavigator />
    </NavigationContainer>
  );
}
