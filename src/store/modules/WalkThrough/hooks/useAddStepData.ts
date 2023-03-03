// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughType} from '@api/user/types';
import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import {WalkThroughData} from '@store/modules/WalkThrough/types';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

export function useAddStepData(walkThroughType: WalkThroughType) {
  const dispatch = useDispatch();
  const addStepData = useCallback(
    ({step, stepData}: {step: number; stepData: WalkThroughData}) => {
      dispatch(
        WalkThroughActions.SET_WALK_THROUGH_STEP.STATE.create({
          walkThroughData: stepData,
          walkThroughType,
          step,
        }),
      );
    },
    [dispatch, walkThroughType],
  );

  return addStepData;
}
