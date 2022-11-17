// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {createAction} from '@store/utils/actions/createAction';

const GET_USER_BY_ID = createAction('GET_USER_BY_ID', {
  START: (userId: string) => ({userId}),
  SUCCESS: (user: User) => ({user}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

export const UsersActions = Object.freeze({
  GET_USER_BY_ID,
});
