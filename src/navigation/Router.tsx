// SPDX-License-Identifier: BUSL-1.1

import {InitializationError} from '@components/InitializationError';
import {AuthNavigator} from '@navigation/Auth';
import {MainNavigator} from '@navigation/Main';
import {theme} from '@navigation/theme';
import {navigationReadyResolver, navigationRef} from '@navigation/utils';
import {WelcomeNavigator} from '@navigation/Welcome';
import {NavigationContainer} from '@react-navigation/native';
import {routingInstrumentation} from '@services/logging';
import {useUserChangedListener} from '@store/modules/Account/hooks/useUserChangedListener';
import {
  isRegistrationCompleteSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {useAppLoadedListener} from '@store/modules/AppCommon/hooks/useAppLoadedListener';
import {useAppStateListener} from '@store/modules/AppCommon/hooks/useAppStateListener';
import {appInitStateSelector} from '@store/modules/AppCommon/selectors';
import {useInitNotifications} from '@store/modules/PushNotifications/hooks/useInitNotifications';
import React, {useCallback, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {useSelector} from 'react-redux';

function ActiveNavigator() {
  const user = useSelector(userSelector);
  const isRegistrationComplete = useSelector(isRegistrationCompleteSelector);
  const appInitState = useSelector(appInitStateSelector);

  useEffect(() => {
    if (appInitState === 'success') {
      navigationReadyResolver();
    }
  }, [appInitState]);

  if (appInitState === 'loading') {
    return null;
  }

  if (appInitState === 'error') {
    return <InitializationError />;
  }

  if (!user) {
    return <AuthNavigator />;
  }

  if (!isRegistrationComplete) {
    return <WelcomeNavigator />;
  }

  return <MainNavigator />;
}

export function Router() {
  useAppLoadedListener();
  useAppStateListener();
  useUserChangedListener();
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
