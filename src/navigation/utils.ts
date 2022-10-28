// SPDX-License-Identifier: BUSL-1.1

import {MainNavigationParams} from '@navigation/Main';
import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef =
  createNavigationContainerRef<MainNavigationParams>();
type NavigationParams = Parameters<typeof navigationRef.navigate>;

export const getCurrentRoute = () => {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute();
  }
};

export function navigate(...params: NavigationParams) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...params);
  }
}
