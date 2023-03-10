// SPDX-License-Identifier: BUSL-1.1

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountActions} from '@store/modules/Account/actions';
import {RateAppActions} from '@store/modules/RateApp/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface State {
  successStartMiningCount: number;
  isRateAppShown: boolean;
}

type Actions = ReturnType<
  | typeof TokenomicsActions.START_MINING_SESSION.SUCCESS.create
  | typeof RateAppActions.SHOW_RATE_APP.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  successStartMiningCount: 0,
  isRateAppShown: false,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case TokenomicsActions.START_MINING_SESSION.SUCCESS.type:
        draft.successStartMiningCount++;
        break;

      case RateAppActions.SHOW_RATE_APP.SUCCESS.type:
        draft.isRateAppShown = true;
        break;

      case AccountActions.SIGN_OUT.SUCCESS.type:
        return {
          ...INITIAL_STATE,
          isRateAppShown: draft.isRateAppShown,
        };
    }
  });
}

export const rateAppReducer = persistReducer(
  {
    key: 'rateApp',
    storage: AsyncStorage,
  },
  reducer,
);
