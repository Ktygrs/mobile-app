// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughType} from '@api/user/types';
import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import {
  WalkThroughElementData,
  WalkThroughSteps,
} from '@store/modules/WalkThrough/types';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

export function useSetWalkthroughElementData<
  T extends WalkThroughType,
  S extends keyof WalkThroughSteps[T],
>(walkThroughType: T) {
  const dispatch = useDispatch();
  const setWalkthroughElementData = useCallback(
    ({step, elementData}: {step: S; elementData: WalkThroughElementData}) => {
      dispatch(
        WalkThroughActions.SET_WALK_THROUGH_STEP_ELEMENT_DATA.STATE.create({
          elementData,
          walkThroughType,
          step: step as never,
        }),
      );
    },
    [dispatch, walkThroughType],
  );

  return {setWalkthroughElementData};
}
