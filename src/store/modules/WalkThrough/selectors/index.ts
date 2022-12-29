// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughType} from '@api/user/types';
import {WalkThroughData} from '@store/modules/WalkThrough/types';
import {RootState} from '@store/rootReducer';

export const getWalkThroughStepData =
  ({walkThroughType, step}: {step: number; walkThroughType: WalkThroughType}) =>
  (state: RootState): WalkThroughData | undefined => {
    return state.walkThrough.walkThroughMap[walkThroughType]?.[step];
  };
