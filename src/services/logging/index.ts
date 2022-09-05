// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client';
import {ENV} from '@constants/env';
import {AnyAction} from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react-native';
import {store} from '@store/configureStore';
import {userSelector} from '@store/modules/Auth/selectors';
import {getErrorMessage} from '@utils/errors';
import * as React from 'react';

export const routingInstrumentation =
  new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: ENV.SENTRY_KEY,
  enabled: !__DEV__,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
  tracesSampleRate: 0.2,
});

export const loggingReduxEnhancer = Sentry.createReduxEnhancer({
  stateTransformer: () => null,
  actionTransformer: (action: AnyAction) => {
    // omit payload cuz it can contain private data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {payload, ...strippedAction} = action;
    return strippedAction;
  },
});

export function LoggingWrapper(app: React.ComponentType) {
  return Sentry.wrap(app);
}

export function logError(error: unknown) {
  if (__DEV__) {
    console.error('logError', getErrorMessage(error), error);
  } else {
    const user = userSelector(store.getState());
    Sentry.withScope(function (scope) {
      if (user) {
        scope.setUser({
          id: user.id,
          username: user.username,
        });
      } else {
        scope.setUser(null);
      }
      Sentry.captureException(
        error,
        isApiError(error)
          ? {
              extra: error.response?.data,
              tags: {api: error.response?.status},
            }
          : undefined,
      );
    });
  }
}
