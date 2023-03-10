// SPDX-License-Identifier: BUSL-1.1

import {put} from '@api/client';
import {TaskType} from '@api/tasks/types';

interface TaskData {
  telegramUserHandle?: string;
  twitterUserHandle?: string;
}
interface Params {
  type: TaskType;
  userId: string;
  data?: TaskData;
}

export function completeTask({type, userId, data}: Params) {
  return put<Params, null>(`/tasks/${type}/users/${userId}`, {
    type,
    userId,
    data,
  });
}
