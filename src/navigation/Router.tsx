// SPDX-License-Identifier: BUSL-1.1

import {RegistrationProcessFinalizedStep} from '@api/user/types';
import {Initialization} from '@components/Initialization';
import {AuthNavigator} from '@navigation/Auth';
import {MainNavigator} from '@navigation/Main';
import {theme} from '@navigation/theme';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {PROFILE_FILL_STEPS} from '@screens/UserRegistrationFlow/ProfileFill';
import {routingInstrumentation} from '@services/logging';
import {useAppLoadedDispatcher} from '@store/modules/AppCommon/hooks/useAppLoadedDispatcher';
import {useAppStateListener} from '@store/modules/AppCommon/hooks/useAppStateListener';
import {isAppInitializedSelector} from '@store/modules/AppCommon/selectors';
import {userSelector} from '@store/modules/Auth/selectors';
import {difference} from 'lodash';
import React, {useCallback} from 'react';
import {LogBox} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {useSelector} from 'react-redux';

/**
 * We don't use state persistence or deep links to the screen which accepts functions in params,
 * so the warning doesn't affect us and we can safely ignore it
 * https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
 */
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function ActiveNavigator() {
  const isAppInitialized = useSelector(isAppInitializedSelector);
  const user = useSelector(userSelector);
  const requiredAuthSteps: RegistrationProcessFinalizedStep[] = [
    'onboarding',
    ...PROFILE_FILL_STEPS,
  ];
  const finilizedAuthSteps =
    user?.clientData?.registrationProcessFinalizedSteps ?? [];

  if (!isAppInitialized) {
    return <Initialization />;
  }

  if (!user || difference(requiredAuthSteps, finilizedAuthSteps).length !== 0) {
    return <AuthNavigator />;
  }

  return <MainNavigator />;
}

export function Router() {
  useAppLoadedDispatcher();
  useAppStateListener();
  const navigationRef = useNavigationContainerRef();

  const onReady = useCallback(() => {
    routingInstrumentation.registerNavigationContainer(navigationRef);
    RNBootSplash.hide();
  }, [navigationRef]);

  return (
    <NavigationContainer ref={navigationRef} theme={theme} onReady={onReady}>
      <ActiveNavigator />
    </NavigationContainer>
  );
}
