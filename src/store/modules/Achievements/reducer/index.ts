// SPDX-License-Identifier: BUSL-1.1

import {Achievement} from '@api/achievements/types';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import produce from 'immer';

export interface State {
  achievements: Achievement[];
}

type Actions = ReturnType<
  typeof AchievementsActions.ACHIEVEMENTS_LOAD.SUCCESS.create
>;

const INITIAL_STATE: State = {
  achievements: [],
};

export function achievementsReducer(
  state = INITIAL_STATE,
  action: Actions,
): State {
  return produce(state, draft => {
    switch (action.type) {
      case AchievementsActions.ACHIEVEMENTS_LOAD.SUCCESS.type:
        {
          const {achievements} = action.payload;
          draft.achievements = achievements;
        }
        break;
    }
  });
}
