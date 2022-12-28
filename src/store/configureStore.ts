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
  middleware: middlewares,
  enhancers: [loggingReduxEnhancer],
});

sagaMiddleware.run(rootSaga);
