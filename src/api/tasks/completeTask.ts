// SPDX-License-Identifier: BUSL-1.1

import {buildFormData, patch} from '@api/client';
import {Task} from '@api/tasks/types';

interface Params {
  name: string;
}

export function completeTask({name}: Params) {
  return patch<FormData, Task[]>(
    '/achievements',
    buildFormData({
      name,
      completed: true,
    }),
  );
}
