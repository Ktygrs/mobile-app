// SPDX-License-Identifier: BUSL-1.1

import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getAchievements} from '@store/modules/Achievements/selectors/getAchievements';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useAchievements() {
  const dispatch = useDispatch();

  const achievements = useSelector(getAchievements);

  useEffect(() => {
    dispatch(AchievementsActions.GET_ACHIEVEMENTS.START.create());
  }, [dispatch]);

  return {
    achievements,
  };
}
