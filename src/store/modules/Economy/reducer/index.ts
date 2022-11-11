// SPDX-License-Identifier: BUSL-1.1

import AsyncStorage from '@react-native-async-storage/async-storage';
import {EconomyActions} from '@store/modules/Economy/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

//TODO:: use user.clientData to persist the flag, remove redux persistor afterwards
export interface EconomyState {
  isMiningTooltipSeen: boolean;
}

type Actions = ReturnType<
  typeof EconomyActions.STORE_MINIG_TOOLTIP_SEEN.STATE.create
>;

const INITIAL_STATE: EconomyState = {
  isMiningTooltipSeen: false,
};

function reducer(state = INITIAL_STATE, action: Actions): EconomyState {
  return produce(state, draft => {
    switch (action.type) {
      case EconomyActions.STORE_MINIG_TOOLTIP_SEEN.STATE.type:
        draft.isMiningTooltipSeen = true;
        break;
    }
  });
}

const persistConfig = {
  key: 'economy',
  storage: AsyncStorage,
  timeout: 120000,
  whitelist: ['isMiningTooltipSeen'],
};

export const economyReducer = persistReducer(persistConfig, reducer);
