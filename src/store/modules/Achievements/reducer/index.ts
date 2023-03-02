// SPDX-License-Identifier: BUSL-1.1

import {Achievement} from '@api/achievements/types';
import {AccountActions} from '@store/modules/Account/actions';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import produce from 'immer';

export interface State {
  achievements: Achievement[];
}

type Actions = ReturnType<
  | typeof AchievementsActions.GET_ACHIEVEMENTS.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
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
      case AchievementsActions.GET_ACHIEVEMENTS.SUCCESS.type:
        {
          const {achievements} = action.payload;
          draft.achievements = achievements;
        }
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {...INITIAL_STATE};
      }
    }
  });
}
