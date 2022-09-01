// SPDX-License-Identifier: BUSL-1.1

import {AuthActions} from '@store/modules/Auth/actions';
import {StatisticsActions} from '@store/modules/Statistics/actions';
import produce from 'immer';

export type Country = {
  country: string;
  userCount: number;
};

export interface State {
  topCountries: Country[];
}

type Actions = ReturnType<
  | typeof StatisticsActions.GET_TOP_COUNTRIES.SUCCESS.create
  | typeof AuthActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  topCountries: [],
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case StatisticsActions.GET_TOP_COUNTRIES.SUCCESS.type:
        draft.topCountries = action.payload.topCountries;
        break;
      case AuthActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
        };
      }
    }
  });
}

export const statisticsReducer = reducer;
