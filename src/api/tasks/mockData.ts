// SPDX-License-Identifier: BUSL-1.1

import {Task} from '@api/tasks/types';

export const mockedTasks: Task[] = [
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
