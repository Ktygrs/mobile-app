// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughType} from '@api/user/types';
import {userSelector} from '@store/modules/Account/selectors';
import {getMaxStepVersion} from '@store/modules/WalkThrough/selectors/utils';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export function useHasStepsToShow(walkThroughType: WalkThroughType): boolean {
  const [hasStepsToShow, setHasStepsToShow] = useState(false);
  const user = useSelector(userSelector);

  useEffect(() => {
    if (user) {
      const walkThroughElement =
        user?.clientData?.walkTroughProgress?.[walkThroughType];
      if (walkThroughElement) {
        const userVersion: number = walkThroughElement.version;
        const maxStepVersion = getMaxStepVersion(walkThroughType);
        setHasStepsToShow(maxStepVersion > userVersion);
      } else {
        setHasStepsToShow(true);
      }
    }
  }, [user, walkThroughType]);

  return hasStepsToShow;
}
