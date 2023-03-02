// SPDX-License-Identifier: BUSL-1.1

import {mockedAchievements} from '@api/achievements/mockData';

// import {get} from '@api/client';
import {Achievement} from './types';

/**
 * Returns an user tasks
 */

export function getAchievements(): Promise<Achievement[]> {
  /** Mocked data */
  return new Promise(resolve => {
    resolve(mockedAchievements);
  });
  // return get<Achievement[]>('/achievements').then(() => {});
}
