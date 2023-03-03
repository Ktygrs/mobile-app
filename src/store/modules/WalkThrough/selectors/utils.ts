// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughType} from '@api/user/types';
import {WALK_THROUGH_STEPS_VERSIONS} from '@store/modules/WalkThrough/constants';
import {WalkThroughStepData} from '@store/modules/WalkThrough/types';

export function getMaxStepVersion(walkThroughType: WalkThroughType) {
  const stepVersions: {[step: number]: WalkThroughStepData} =
    WALK_THROUGH_STEPS_VERSIONS[walkThroughType];
  if (!stepVersions) {
    return 0;
  }
  return Math.max(
    ...Object.keys(stepVersions).map(
      (version: string) => stepVersions[Number(version)].version,
    ),
  );
}

export function getStepData({
  walkThroughType,
  step,
}: {
  step: number;
  walkThroughType: WalkThroughType;
}): WalkThroughStepData {
  const stepVersions: {[step: number]: WalkThroughStepData} =
    WALK_THROUGH_STEPS_VERSIONS[walkThroughType];
  if (!stepVersions) {
    return {version: 0, description: '', title: ''};
  }
  return stepVersions[step];
}
