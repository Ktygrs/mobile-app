// SPDX-License-Identifier: BUSL-1.1

import {navigationRef} from '@navigation/utils';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {useCallback, useRef} from 'react';

export function useOnStateChange() {
  const routeNameRef = useRef(navigationRef?.getCurrentRoute()?.name);
  return useCallback(() => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef?.getCurrentRoute()?.name;
    if (previousRouteName !== currentRouteName && currentRouteName) {
      routeNameRef.current = currentRouteName;
      AnalyticsEventLogger.trackViewScreen({screenName: currentRouteName});
    }
  }, [routeNameRef]);
}
