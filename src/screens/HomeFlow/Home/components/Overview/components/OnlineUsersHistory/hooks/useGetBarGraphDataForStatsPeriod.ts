// SPDX-License-Identifier: BUSL-1.1

import {timeSeriesToUsersData} from '@screens/HomeFlow/Home/components/Overview/components/OnlineUsersHistory/utils/timeSeriesToGraphData';
import {StatsActions} from '@store/modules/Stats/actions';
import {getUserGrowthStatsSelector} from '@store/modules/Stats/selectors';
import {StatsPeriod, UsersBarGraphData} from '@store/modules/Stats/types';
import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useGetBarGraphDataForStatsPeriod(
  statsPeriod: StatsPeriod,
): UsersBarGraphData {
  const timeSeries = useSelector(getUserGrowthStatsSelector(statsPeriod));

  const usersBarGraphData: UsersBarGraphData = useMemo(() => {
    return timeSeriesToUsersData({
      timeSeries: timeSeries,
      statsPeriod,
    });
  }, [timeSeries, statsPeriod]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(StatsActions.GET_USER_GROWTH_STATS.START.create(statsPeriod));
  }, [dispatch, statsPeriod]);

  return usersBarGraphData;
}
