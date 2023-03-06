// SPDX-License-Identifier: BUSL-1.1

import {Achievement} from '@api/achievements/types';
import {createAction} from '@store/utils/actions/createAction';

const GET_ACHIEVEMENTS = createAction('GET_ACHIEVEMENTS', {
  START: () => {},
  SUCCESS: (payload: {achievements: Achievement[]}) => payload,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const ACHIEVEMENT_MARK_COMPLETED = createAction('ACHIEVEMENT_MARK_COMPLETED', {
  START: (payload: {name: string}) => payload,
});

const COMPLETE_CURRENT_ACTIVE_ACHIEVEMENT = createAction(
  'COMPLETE_CURRENT_ACTIVE_ACHIEVEMENT',
  {
    STATE: true,
  },
);

export const AchievementsActions = Object.freeze({
  GET_ACHIEVEMENTS,
  ACHIEVEMENT_MARK_COMPLETED,
  COMPLETE_CURRENT_ACTIVE_ACHIEVEMENT,
});
