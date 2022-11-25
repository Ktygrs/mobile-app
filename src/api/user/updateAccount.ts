// SPDX-License-Identifier: BUSL-1.1

import {buildFormData, patch} from '@api/client';
import {User} from '@api/user/types';

export function updateAccount(
  userId: string,
  user: Partial<User> & {checksum: string},
) {
  const formData = buildFormData(user);
  return patch<FormData, User>(`/users/${userId}`, formData);
}
