// SPDX-License-Identifier: BUSL-1.1

import {put} from '@api/client';
import {TaskType} from '@api/tasks/types';

interface TaskData {
  telegramUserHandle?: string;
  twitterUserHandle?: string;
}
interface Params {
  taskType: TaskType;
  userId: string;
  data?: TaskData;
}

export function completeTask({taskType, userId, data}: Params) {
  return put<Params, null>(`/tasks/${taskType}/users/${userId}`, {
    taskType,
    userId,
    data,
  });
}
