// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughType} from '@api/user/types';
import {
  WalkThroughStep,
  WalkThroughSteps,
} from '@store/modules/WalkThrough/types';
import {RootState} from '@store/rootReducer';

export const walkThroughStepDataSelector =
  <T extends WalkThroughType, S extends keyof WalkThroughSteps[T]>({
    walkThroughType,
    step,
  }: {
    walkThroughType: T;
    step: S;
  }) =>
  (state: RootState) => {
    return state.walkThrough.steps[walkThroughType][step] as WalkThroughStep;
  };

export const maxWalkThroughTypeVersionSelector =
  (walkThroughType: WalkThroughType) => (state: RootState) => {
    const stepVersions = state.walkThrough.steps[walkThroughType];
    return Math.max(...Object.values(stepVersions).map(step => step.version));
  };

export const numberOfStepsSelector =
  (walkThroughType: WalkThroughType) => (state: RootState) => {
    return Object.keys(state.walkThrough.steps[walkThroughType]).length;
  };
