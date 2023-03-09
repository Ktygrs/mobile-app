// SPDX-License-Identifier: BUSL-1.1

import {
  WalkthroughElementData,
  WalkthroughStepKey,
} from '@store/modules/Walkthrough/types';
import {createAction} from '@store/utils/actions/createAction';

const SET_WALKTHROUGH_STEP_ELEMENT_DATA = createAction(
  'SET_WALKTHROUGH_STEP_ELEMENT_DATA',
  {
    STATE: (payload: {
      stepKey: WalkthroughStepKey;
      elementData: WalkthroughElementData;
    }) => payload,
  },
);

const COMPLETE_WALKTHROUGH_STEP = createAction('COMPLETE_WALKTHROUGH_STEP', {
  STATE: (payload: {stepKey: WalkthroughStepKey}) => payload,
});

const SKIP_WALKTHROUGH = createAction('SKIP_WALKTHROUGH', {
  STATE: true,
});

const RESTART_WALKTHROUGH = createAction('RESTART_WALKTHROUGH', {
  STATE: true,
});

export const WalkthroughActions = Object.freeze({
  SET_WALKTHROUGH_STEP_ELEMENT_DATA,
  COMPLETE_WALKTHROUGH_STEP,
  SKIP_WALKTHROUGH,
  RESTART_WALKTHROUGH,
});