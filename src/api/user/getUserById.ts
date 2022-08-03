// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {User} from '@api/user/types';

/**
 * Returns an user's account.
 */

export function getUserById(userId: string) {
  return get<User>(`/users/${userId}`);
}
