// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import {WalkThroughData} from '@store/modules/WalkThrough/types';
import produce from 'immer';

export interface WalkThroughState {
  walkThroughMap: {[key: string]: WalkThroughData[]};
}

type Actions = ReturnType<
  typeof WalkThroughActions.SET_WALK_THROUGH_STEP.STATE.create
>;

const INITIAL_STATE: WalkThroughState = {
  walkThroughMap: {},
};

function reducer(state = INITIAL_STATE, action: Actions): WalkThroughState {
  return produce(state, draft => {
    switch (action.type) {
      case WalkThroughActions.SET_WALK_THROUGH_STEP.STATE.type: {
        const {walkThroughData, walkThroughType, step} = action.payload;
        if (!draft.walkThroughMap[walkThroughType]) {
          draft.walkThroughMap[walkThroughType] = [];
        }
        draft.walkThroughMap[walkThroughType][step] = walkThroughData;
        break;
      }
    }
  });
}

export const walkThroughReducer = reducer;
