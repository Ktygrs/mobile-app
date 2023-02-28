// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughType} from '@api/user/types';
import {
  WalkThroughElementData,
  WalkThroughSteps,
} from '@store/modules/WalkThrough/types';
import {createAction} from '@store/utils/actions/createAction';

const SET_WALK_THROUGH_STEP_ELEMENT_DATA = createAction(
  'SET_WALK_THROUGH_STEP_ELEMENT_DATA',
  {
    STATE: <
      T extends WalkThroughType,
      S extends keyof WalkThroughSteps[T],
    >(payload: {
      walkThroughType: T;
      step: S;
      elementData: WalkThroughElementData;
    }) => payload,
  },
);

export const WalkThroughActions = Object.freeze({
  SET_WALK_THROUGH_STEP_ELEMENT_DATA,
});
