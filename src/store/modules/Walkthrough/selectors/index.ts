// SPDX-License-Identifier: BUSL-1.1

import {createSelector} from '@reduxjs/toolkit';
import {userSelector} from '@store/modules/Account/selectors';
import {WALKTHROUGH_STEPS} from '@store/modules/Walkthrough/steps';
import {
  WalkthroughStep,
  WalkthroughStepKey,
} from '@store/modules/Walkthrough/types';
import {RootState} from '@store/rootReducer';

export const walkthroughStepCandidatesSelector = createSelector(
  [userSelector, (state: RootState) => state.walkthroughReducer.stepElements],
  (user, stepElements) => {
    if (!user) {
      return [];
    }

    return WALKTHROUGH_STEPS.reduce<WalkthroughStep[]>((result, step) => {
      const stepSeenVersion =
        user.clientData?.walkthroughProgress?.[step.key]?.version ?? 0;
      if (step.version > stepSeenVersion && !!stepElements[step.key]) {
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

export const isStepHasToBeShownSelector =
  (stepKey: WalkthroughStepKey) => (state: RootState) => {
    const user = userSelector(state);
    const stepSeenVersion =
      user?.clientData?.walkthroughProgress?.[stepKey]?.version ?? 0;
    const stepLastVersion = WALKTHROUGH_STEPS.find(
      s => s.key === stepKey,
    )?.version;

    if (stepLastVersion && stepLastVersion > stepSeenVersion) {
      return true;
    }

    return false;
  };
