// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import {WALK_THROUGH_STEPS} from '@store/modules/WalkThrough/steps';
import {
  WalkThroughStep,
  WalkThroughSteps,
} from '@store/modules/WalkThrough/types';
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
        const {elementData, walkThroughType, step} = action.payload;
        (draft.steps[walkThroughType][step] as WalkThroughStep).elementData =
          elementData;
        break;
      }
    }
  });
}

export const walkThroughReducer = reducer;
