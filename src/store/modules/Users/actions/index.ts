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

const UPDATE_VIEWED_ONBOARDINGS = createAction('UPDATE_VIEWED_ONBOARDINGS', {
  STATE: (userId: string) => ({userId}),
});

export const UsersActions = Object.freeze({
  GET_USER_BY_ID,
  UPDATE_VIEWED_ONBOARDINGS,
});
