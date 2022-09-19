// SPDX-License-Identifier: BUSL-1.1

import {put} from '@api/client';
import {User} from '@api/user/types';

interface Params {
  userId: string;
  email: string;
  validationCode: string;
}

export function validateEmail({userId, email, validationCode}: Params) {
  return put<Params, User>(`/user-validations/${userId}/email`, {
    userId,
    email,
    validationCode,
  });
}
