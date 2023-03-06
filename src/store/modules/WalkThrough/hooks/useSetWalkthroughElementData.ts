// SPDX-License-Identifier: BUSL-1.1

import {store} from '@store/configureStore';
import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import {isStepHasToBeShownSelector} from '@store/modules/WalkThrough/selectors';
import {
  WalkThroughElementData,
  WalkthroughStepKey,
} from '@store/modules/WalkThrough/types';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

export function useSetWalkthroughElementData() {
  const dispatch = useDispatch();
  const setWalkthroughElementData = useCallback(
    ({
      stepKey,
      elementData,
    }: {
      stepKey: WalkthroughStepKey;
      elementData: WalkThroughElementData;
    }) => {
      const isStepHasToBeShown = isStepHasToBeShownSelector(stepKey)(
        store.getState(),
      );
      if (isStepHasToBeShown) {
        dispatch(
          WalkThroughActions.SET_WALK_THROUGH_STEP_ELEMENT_DATA.STATE.create({
            elementData,
            stepKey,
          }),
        );
      }
    },
    [dispatch],
  );

  return {setWalkthroughElementData};
}
