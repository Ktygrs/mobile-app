// SPDX-License-Identifier: BUSL-1.1

import {createSelector} from '@reduxjs/toolkit';
import {userSelector} from '@store/modules/Account/selectors';
import {RootState} from '@store/rootReducer';

export const walkthroughStepCandidatesSelector = createSelector(
  [userSelector, (state: RootState) => state.walkThrough.steps],
  (user, steps) => {
    if (!user) {
      return [];
    }

    return steps.filter(step => {
      const seenStepVersion =
        user.clientData?.walkTroughProgress?.[step.key]?.version ?? 0;
      return step.version > seenStepVersion && !!step.elementData;
    });
  },
);
