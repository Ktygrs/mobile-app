// SPDX-License-Identifier: BUSL-1.1

import {
  WalkThroughElementData,
  WalkthroughStepKey,
} from '@store/modules/WalkThrough/types';
import {createAction} from '@store/utils/actions/createAction';

const SET_WALK_THROUGH_STEP_ELEMENT_DATA = createAction(
  'SET_WALK_THROUGH_STEP_ELEMENT_DATA',
  {
    STATE: (payload: {
      stepKey: WalkthroughStepKey;
      elementData: WalkThroughElementData;
    }) => payload,
  },
);

const COMPLETE_WALK_THROUGH_STEP = createAction('COMPLETE_WALK_THROUGH_STEP', {
  STATE: (payload: {stepKey: WalkthroughStepKey}) => payload,
});

const SKIP_WALK_THROUGH = createAction('SKIP_WALK_THROUGH', {
  STATE: true,
});

export const WalkThroughActions = Object.freeze({
  SET_WALK_THROUGH_STEP_ELEMENT_DATA,
  COMPLETE_WALK_THROUGH_STEP,
  SKIP_WALK_THROUGH,
});
