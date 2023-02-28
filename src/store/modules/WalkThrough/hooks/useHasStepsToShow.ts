// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughType} from '@api/user/types';
import {userSelector} from '@store/modules/Account/selectors';
import {getMaxStepVersion} from '@store/modules/WalkThrough/selectors/utils';
import {useSelector} from 'react-redux';

export function useHasStepsToShow(walkThroughType: WalkThroughType) {
  const user = useSelector(userSelector);

  const walkThroughElement =
    user?.clientData?.walkTroughProgress?.[walkThroughType];
  if (walkThroughElement) {
    const userVersion: number = walkThroughElement.version;
    const maxStepVersion = getMaxStepVersion(walkThroughType);
    return maxStepVersion > userVersion;
  }

  return true;
}
