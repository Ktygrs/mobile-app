// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';

import {Achievement} from './types';

/**
 * Returns an user tasks
 */

export function getAchievements() {
  return get<Achievement[]>('/achievements');
}
