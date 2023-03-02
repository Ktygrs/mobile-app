// SPDX-License-Identifier: BUSL-1.1

import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getAchievements} from '@store/modules/Achievements/selectors/getAchievements';
import {isEmpty} from 'lodash';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useAchievements() {
  const dispatch = useDispatch();

  const achievements: ReturnType<typeof getAchievements> =
    useSelector(getAchievements);

  useEffect(() => {
    // TODO: achievements: remove when api would be connected
    if (isEmpty(achievements)) {
      dispatch(AchievementsActions.GET_ACHIEVEMENTS.START.create());
    }
  }, [dispatch, achievements]);

  return {
    achievements,
  };
}
