// SPDX-License-Identifier: BUSL-1.1

import {Achievement} from '@api/achievements/types';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import produce from 'immer';

export interface State {
  achievements: Achievement[];
  needRefresh: boolean;
}

type Actions = ReturnType<
  | typeof AchievementsActions.GET_ACHIEVEMENTS.SUCCESS.create
  | typeof AchievementsActions.UPDATE_NEED_ACHIEVEMENTS_REFRESH.STATE.create
>;

const INITIAL_STATE: State = {
  achievements: [],
  needRefresh: false,
};

export function achievementsReducer(
  state = INITIAL_STATE,
  action: Actions,
): State {
  return produce(state, draft => {
    switch (action.type) {
      case AchievementsActions.GET_ACHIEVEMENTS.SUCCESS.type:
        {
          const {achievements} = action.payload;
          draft.achievements = achievements;
          draft.needRefresh = false;
        }
        break;
      case AchievementsActions.UPDATE_NEED_ACHIEVEMENTS_REFRESH.STATE.type:
        draft.needRefresh = true;
        break;
    }
  });
}
