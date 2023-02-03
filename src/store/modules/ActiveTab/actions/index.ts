// SPDX-License-Identifier: BUSL-1.1

import {createAction} from '@store/utils/actions/createAction';

export type Tab = 'home' | 'team' | 'news' | 'profile';

const SET_ACTIVE_TAB = createAction('SET_ACTIVE_TAB', {
  STATE: (tab: Tab) => ({tab}),
});

export const ActiveTabActions = Object.freeze({
  SET_ACTIVE_TAB,
});
