// SPDX-License-Identifier: BUSL-1.1

import {Achievement} from '@api/achievements/types';

export const mockedAchievements: Achievement[] = [
  {
    name: 'claim_username',
    completed: true,
  },
  {
    name: 'start_mining',
    completed: false,
  },
  {
    name: 'upload_profile_picture',
    completed: false,
  },
  {
    name: 'follow_us_on_twitter',
    completed: false,
  },
  {
    name: 'join_telegram',
    completed: false,
  },
  {
    name: 'invite_friends',
    completed: false,
    data: {
      requiredQuantity: 5,
    },
  },
];
