// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';

import {Task} from './types';

/**
 * Returns an user tasks
 */

export function getTasks(userId: string): Promise<Task[]> {
  return get<Task[]>(`/tasks/x/users/${userId}`);
}
