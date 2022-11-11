// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const userByIdSelector = (userId: string) => (state: RootState) =>
  state.users.entities[userId];
