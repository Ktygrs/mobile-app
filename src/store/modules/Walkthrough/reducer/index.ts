// SPDX-License-Identifier: BUSL-1.1

import {AccountActions} from '@store/modules/Account/actions';
import {WalkthroughActions} from '@store/modules/Walkthrough/actions';
import {
  WalkthroughElementData,
  WalkthroughStepKey,
} from '@store/modules/Walkthrough/types';
import produce from 'immer';

export interface WalkthroughState {
  stepElements: {[key in WalkthroughStepKey]?: WalkthroughElementData};
}

type Actions = ReturnType<
  | typeof WalkthroughActions.SET_WALKTHROUGH_STEP_ELEMENT_DATA.STATE.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: WalkthroughState = {
  stepElements: {},
};

function reducer(state = INITIAL_STATE, action: Actions): WalkthroughState {
  return produce(state, draft => {
    switch (action.type) {
      case WalkthroughActions.SET_WALKTHROUGH_STEP_ELEMENT_DATA.STATE.type: {
        const {elementData, stepKey} = action.payload;
        draft.stepElements[stepKey] = elementData;
        break;
      }
      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {...INITIAL_STATE};
      }
    }
  });
}

export const walkthroughReducer = reducer;
