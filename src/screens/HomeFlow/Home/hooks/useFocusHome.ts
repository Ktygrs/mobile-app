// SPDX-License-Identifier: BUSL-1.1

import {useFocusEffect} from '@react-navigation/native';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {needAchievementsRefresh} from '@store/modules/Achievements/selectors/needAchievementsRefresh';
import {useDispatch, useSelector} from 'react-redux';

export const useFocusHome = () => {
  const dispatch = useDispatch();

  const needRefresh: ReturnType<typeof needAchievementsRefresh> = useSelector(
    needAchievementsRefresh,
  );

  useFocusEffect(() => {
    if (needRefresh) {
      // TODO: achievements: replace with get achievements action
      // when api would be connected
      dispatch(AchievementsActions.COMPLETE_NEXT_ACHIEVEMENT.STATE.create());
    }
  });
};
