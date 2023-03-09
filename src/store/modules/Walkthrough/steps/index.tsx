// SPDX-License-Identifier: BUSL-1.1

import {NEWS_WALKTHROUGH_STEPS} from '@store/modules/Walkthrough/steps/news';
import {TEAM_WALKTHROUGH_STEPS} from '@store/modules/Walkthrough/steps/team';

export const WALKTHROUGH_STEPS = [
  ...TEAM_WALKTHROUGH_STEPS,
  ...NEWS_WALKTHROUGH_STEPS,
];
