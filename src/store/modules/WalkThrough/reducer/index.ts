// SPDX-License-Identifier: BUSL-1.1

import {AccountActions} from '@store/modules/Account/actions';
import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import {WALK_THROUGH_STEPS} from '@store/modules/WalkThrough/steps';
import {WalkThroughSteps} from '@store/modules/WalkThrough/types';
import produce from 'immer';

export interface WalkThroughState {
  steps: WalkThroughSteps;
}

type Actions = ReturnType<
  | typeof WalkThroughActions.SET_WALK_THROUGH_STEP_ELEMENT_DATA.STATE.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: WalkThroughState = {
  steps: WALK_THROUGH_STEPS,
};

function reducer(state = INITIAL_STATE, action: Actions): WalkThroughState {
  return produce(state, draft => {
    switch (action.type) {
      case WalkThroughActions.SET_WALK_THROUGH_STEP_ELEMENT_DATA.STATE.type: {
        const {elementData, stepKey} = action.payload;
        const step = draft.steps.find(s => s.key === stepKey);
        if (step) {
          step.elementData = elementData;
        }
        break;
      }
      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {...INITIAL_STATE};
      }
    }
  });
}

export const walkThroughReducer = reducer;
