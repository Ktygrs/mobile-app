// SPDX-License-Identifier: BUSL-1.1

import {Achievement} from '@api/achievements/types';
import {createAction} from '@store/utils/actions/createAction';

const ACHIEVEMENTS_LOAD = createAction('ACHIEVEMENTS_LOAD', {
  START: () => {},
  SUCCESS: (payload: {achievements: Achievement[]}) => payload,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const ACHIEVEMENT_MARK_COMPLETED = createAction('ACHIEVEMENT_MARK_COMPLETED', {
  START: (payload: {name: string}) => payload,
});

export const AchievementsActions = Object.freeze({
  ACHIEVEMENTS_LOAD,
  ACHIEVEMENT_MARK_COMPLETED,
});
