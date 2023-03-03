// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import {WALK_THROUGH_STEPS} from '@store/modules/WalkThrough/steps';
import {WalkThroughSteps} from '@store/modules/WalkThrough/types';
import produce from 'immer';

export interface WalkThroughState {
  steps: WalkThroughSteps;
}

type Actions = ReturnType<
  typeof WalkThroughActions.SET_WALK_THROUGH_STEP_ELEMENT_DATA.STATE.create
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
    }
  });
}

export const walkThroughReducer = reducer;
