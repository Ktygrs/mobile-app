// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughType} from '@api/user/types';
import {WalkThroughData} from '@store/modules/WalkThrough/types';
import {createAction} from '@store/utils/actions/createAction';

const SET_WALK_THROUGH_STEP = createAction('SET_WALK_THROUGH_STEP', {
  STATE: ({
    walkThroughData,
    walkThroughType,
    step,
  }: {
    walkThroughData: WalkThroughData;
    step: number;
    walkThroughType: WalkThroughType;
  }) => ({walkThroughData, walkThroughType, step}),
});

export const WalkThroughActions = Object.freeze({
  SET_WALK_THROUGH_STEP,
});
