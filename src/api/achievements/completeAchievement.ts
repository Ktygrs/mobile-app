// SPDX-License-Identifier: BUSL-1.1

import {Achievement} from '@api/achievements/types';
import {buildFormData, patch} from '@api/client';

interface Params {
  name: string;
}

export function completeAchievement({name}: Params) {
  return patch<FormData, Achievement[]>(
    '/achievements',
    buildFormData({
      name,
      completed: true,
    }),
  );
}
