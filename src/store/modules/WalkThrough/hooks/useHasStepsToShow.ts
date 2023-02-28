// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughType} from '@api/user/types';
import {userSelector} from '@store/modules/Account/selectors';
import {maxWalkThroughTypeVersionSelector} from '@store/modules/WalkThrough/selectors';
import {useSelector} from 'react-redux';

export function useHasStepsToShow(walkThroughType: WalkThroughType) {
  const user = useSelector(userSelector);
  const maxStepsVersion = useSelector(
    maxWalkThroughTypeVersionSelector(walkThroughType),
  );

  const walkThroughElement =
    user?.clientData?.walkTroughProgress?.[walkThroughType];
  if (walkThroughElement) {
    const userVersion = walkThroughElement.version;
    const maxStepVersion = maxStepsVersion;
    return maxStepVersion > userVersion;
  }

  return true;
}
