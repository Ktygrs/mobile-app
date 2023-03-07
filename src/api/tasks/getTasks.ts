// SPDX-License-Identifier: BUSL-1.1

import {mockedTasks} from '@api/tasks/mockData';

// import {get} from '@api/client';
import {Task} from './types';

/**
 * Returns an user tasks
 */

export function getTasks(): Promise<Task[]> {
  /** Mocked data */
  return new Promise(resolve => {
    resolve(mockedTasks);
  });
  // return get<Task[]>('/achievements').then(() => {});
}
