// SPDX-License-Identifier: BUSL-1.1

import {RegistrationProcessFinalizedStep} from '@api/user/types';
import {AuthNavigator} from '@navigation/Auth';
import {MainNavigator} from '@navigation/Main';
import {theme} from '@navigation/theme';
import {navigationReadyResolver, navigationRef} from '@navigation/utils';
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
import {isOnboardingViewedSelector} from '@store/modules/Users/selectors';
import {difference} from 'lodash';
import React, {useCallback} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {useSelector} from 'react-redux';

const REQUIRED_AUTH_STEPS: RegistrationProcessFinalizedStep[] = [
  'username',
  'referral',
  // 'email', //TODO: temp email step disabling
  'iceBonus',
];

function ActiveNavigator() {
  const user = useSelector(userSelector);
  const isOnboardingViewed = useSelector(isOnboardingViewedSelector(user?.id));
  const isAppInitialized = useSelector(isAppInitializedSelector);

  const finalizedAuthSteps =
    user?.clientData?.registrationProcessFinalizedSteps ?? [];

  if (!isAppInitialized) {
    return null; // previously we returned Initialization component but now null is ok since we have animated splash over the navigator
  }

  if (!user) {
    return <AuthNavigator />;
  }

  if (
    difference(REQUIRED_AUTH_STEPS, finalizedAuthSteps).length !== 0 ||
    !isOnboardingViewed
  ) {
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
    navigationReadyResolver();
    routingInstrumentation.registerNavigationContainer(navigationRef);
    RNBootSplash.hide();
  }, []);

  return (
    <NavigationContainer ref={navigationRef} theme={theme} onReady={onReady}>
      <ActiveNavigator />
    </NavigationContainer>
  );
}
