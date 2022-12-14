// SPDX-License-Identifier: BUSL-1.1

import {UserGrowth} from '@api/statistics/types';
import {StatsPeriod} from '@store/modules/Stats/types';
import {createAction} from '@store/utils/actions/createAction';

const GET_USER_GROWTH_STATS = createAction('GET_USER_GROWTH_STATS', {
  START: (statsPeriod: StatsPeriod) => ({statsPeriod}),
  SUCCESS: (statsPeriod: StatsPeriod, userGrowth: UserGrowth) => ({
    statsPeriod,
    userGrowth,
  }),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

export const UserGrowthStatsActions = Object.freeze({
  GET_USER_GROWTH_STATS,
});
