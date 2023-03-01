// SPDX-License-Identifier: BUSL-1.1

import {Achievement} from '@api/achievements/types';

export const mockedAchievements: Achievement[] = [
  {
    type: 'claim_username',
    completed: true,
  },
  {
    type: 'start_mining',
    completed: false,
  },
  {
    type: 'upload_profile_picture',
    completed: false,
  },
  {
    type: 'follow_us_on_twitter',
    completed: false,
  },
  {
    type: 'join_telegram',
    completed: false,
  },
  {
    type: 'invite_friends',
    completed: false,
    data: {
      requiredQuantity: 5,
    },
  },
];
