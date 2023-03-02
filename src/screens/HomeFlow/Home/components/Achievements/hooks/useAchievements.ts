// SPDX-License-Identifier: BUSL-1.1

import {Achievement} from '@api/achievements/types';
import {useFocusEffect} from '@react-navigation/native';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {getAchievements} from '@store/modules/Achievements/selectors/getAchievements';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useAchievements() {
  const dispatch = useDispatch();

  const [currentAchievements, setCurrentAchievements] = useState<Achievement[]>(
    [],
  );

  const achievements: ReturnType<typeof getAchievements> =
    useSelector(getAchievements);

  useEffect(() => {
    if (achievements.length === 0) {
      dispatch(AchievementsActions.GET_ACHIEVEMENTS.START.create());
    } else if (currentAchievements.length === 0 && achievements.length > 0) {
      setCurrentAchievements(achievements);
    }
  }, [dispatch, achievements, currentAchievements]);

  useFocusEffect(() => {
    if (
      currentAchievements.length > 0 &&
      achievements.length > 0 &&
      JSON.stringify(currentAchievements) !== JSON.stringify(achievements)
    ) {
      /** Timeout so user can see the change active achievement animation */
      setTimeout(() => {
        setCurrentAchievements(achievements);
      }, 500);
    }
  });

  return {
    achievements: currentAchievements,
  };
}
