// SPDX-License-Identifier: BUSL-1.1

import {createSelector} from '@reduxjs/toolkit';
import {userSelector} from '@store/modules/Account/selectors';
import {WALK_THROUGH_STEPS} from '@store/modules/WalkThrough/steps';
import {WalkThroughStep} from '@store/modules/WalkThrough/types';
import {RootState} from '@store/rootReducer';

export const walkthroughStepCandidatesSelector = createSelector(
  [userSelector, (state: RootState) => state.walkThrough.stepElements],
  (user, stepElements) => {
    if (!user) {
      return [];
    }

    return WALK_THROUGH_STEPS.reduce<WalkThroughStep[]>((result, step) => {
      const seenStepVersion =
        user.clientData?.walkTroughProgress?.[step.key]?.version ?? 0;
      if (step.version > seenStepVersion && !!stepElements[step.key]) {
        return [
          ...result,
          {
            ...step,
            elementData: stepElements[step.key],
          },
        ];
      }
      return result;
    }, []);
  },
);
