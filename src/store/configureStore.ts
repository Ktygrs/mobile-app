// SPDX-License-Identifier: BUSL-1.1

import {configureStore} from '@reduxjs/toolkit';
import {loggingReduxEnhancer} from '@services/logging';
import createSagaMiddleware from 'redux-saga';

import {rootReducer} from './rootReducer';
import {rootSaga} from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
      serializableCheck: {
        ignoredActionPaths: ['payload.raceConditionStrategy'],
        ignoredPaths: [
          'utilityProcessStatuses.UPDATE_ACCOUNT.payload.raceConditionStrategy',
        ],
      },
    }).concat(middlewares),
  enhancers: [loggingReduxEnhancer],
});

sagaMiddleware.run(rootSaga);
