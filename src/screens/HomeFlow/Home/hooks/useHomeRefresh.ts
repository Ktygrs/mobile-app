// SPDX-License-Identifier: BUSL-1.1

import {useRefresh} from '@hooks/useRefresh';
import {USER_GROWTH_STATS_PERIOD} from '@screens/HomeFlow/Home/components/Overview/components/OnlineUsersHistory';
import {AccountActions} from '@store/modules/Account/actions';
// import {AchievementsActions} from '@store/modules/Achievements/actions';
// import {hasUncompletedAchievements} from '@store/modules/Achievements/selectors/hasUncompletedAchievements';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {StatsActions} from '@store/modules/Stats/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
// import {useSelector} from 'react-redux';

const REFRESH_ACTIONS = [
  TokenomicsActions.GET_BALANCE_SUMMARY,
  TokenomicsActions.GET_MINING_SUMMARY,
  TokenomicsActions.GET_PRE_STAKING_SUMMARY,
  TokenomicsActions.GET_RANKING_SUMMARY,
  AccountActions.GET_ACCOUNT,
  StatsActions.GET_ADOPTION,
  ReferralsActions.GET_REFERRALS_HISTORY,
  ReferralsActions.GET_REFERRALS({referralType: 'T1'})('T1'),
  {
    ...StatsActions.GET_USER_GROWTH_STATS,
    START: {
      ...StatsActions.GET_USER_GROWTH_STATS.START,
      create: () =>
        StatsActions.GET_USER_GROWTH_STATS.START.create(
          USER_GROWTH_STATS_PERIOD,
        ),
    },
  },
];

export const useHomeRefresh = () => {
  // TODO: achievements: remove when api would be connected
  return useRefresh(REFRESH_ACTIONS);

  // const hasUncompleted: ReturnType<typeof hasUncompletedAchievements> =
  //   useSelector(hasUncompletedAchievements);

  // return useRefresh(
  //   hasUncompleted
  //     ? [...REFRESH_ACTIONS, AchievementsActions.GET_ACHIEVEMENTS]
  //     : REFRESH_ACTIONS,
  // );
};
