// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const searchDataSelector = (state: RootState) => state.team.search;

export const isSearchActiveSelector = (state: RootState) =>
  state.team.search.active;

export const contactsSelector = (state: RootState) => state.team.contacts;
