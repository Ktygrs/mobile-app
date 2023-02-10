// SPDX-License-Identifier: BUSL-1.1

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
import {isAppInitializedSelector} from '@store/modules/AppCommon/selectors';
import {useOpenUrlListener} from '@store/modules/Linking/hooks/useOpenUrlListener';
import {useGetstreamListener} from '@store/modules/Notifications/hooks/useGetstreamListener';
import {useInitNotifications} from '@store/modules/PushNotifications/hooks/useInitNotifications';
import React, {useCallback} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {useSelector} from 'react-redux';

function ActiveNavigator() {
  const user = useSelector(userSelector);
  const isRegistrationComplete = useSelector(isRegistrationCompleteSelector);
  const isAppInitialized = useSelector(isAppInitializedSelector);

  if (!isAppInitialized) {
    return null; // previously we returned Initialization component but now null is ok since we have animated splash over the navigator
  } else {
    navigationReadyResolver();
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
