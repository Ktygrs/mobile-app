// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughType} from '@api/user/types';
import {WALK_THROUGH_STEPS_VERSIONS} from '@store/modules/WalkThrough/constants';

export function getMaxStepVersion(walkThroughType: WalkThroughType) {
  const stepVersions: {[step: number]: number} =
    WALK_THROUGH_STEPS_VERSIONS[walkThroughType];
  if (!stepVersions) {
    return 0;
  }
  return Math.max(
    ...Object.keys(stepVersions).map(
      (version: string) => stepVersions[Number(version)],
    ),
  );
}

export function getStepVersion({
  walkThroughType,
  step,
}: {
  step: number;
  walkThroughType: WalkThroughType;
}): number {
  const stepVersions: {[step: number]: number} =
    WALK_THROUGH_STEPS_VERSIONS[walkThroughType];
  if (!stepVersions) {
    return 0;
  }
  return stepVersions[step];
}
