// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import {
  WalkThroughElementData,
  WalkthroughStepKey,
} from '@store/modules/WalkThrough/types';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

export function useSetWalkthroughElementData() {
  //TODO:check if we actually need to dispatch it (check version)
  const dispatch = useDispatch();
  const setWalkthroughElementData = useCallback(
    ({
      stepKey,
      elementData,
    }: {
      stepKey: WalkthroughStepKey;
      elementData: WalkThroughElementData;
    }) => {
      dispatch(
        WalkThroughActions.SET_WALK_THROUGH_STEP_ELEMENT_DATA.STATE.create({
          elementData,
          stepKey,
        }),
      );
    },
    [dispatch],
  );

  return {setWalkthroughElementData};
}
