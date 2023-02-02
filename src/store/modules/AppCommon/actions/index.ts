// SPDX-License-Identifier: BUSL-1.1

import {createAction} from '@store/utils/actions/createAction';

export type AppStateType =
  | 'active'
  | 'background'
  | 'inactive'
  | 'unknown'
  | 'extension';

const APP_LOADED = createAction('APP_LOADED', {
  STATE: true,
});

const APP_INITIALIZED = createAction('APP_INITIALIZED', {
  STATE: true,
});

const APP_STATE_CHANGE = createAction('APP_STATE_CHANGE', {
  STATE: (appState: AppStateType) => ({appState}),
});

const INTERVAL_UPDATE = createAction('INTERVAL_UPDATE', {
  STATE: true,
});

export const AppCommonActions = Object.freeze({
  APP_LOADED,
  APP_INITIALIZED,
  APP_STATE_CHANGE,
  INTERVAL_UPDATE,
});
