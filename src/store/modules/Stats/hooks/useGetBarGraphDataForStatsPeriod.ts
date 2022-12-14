// SPDX-License-Identifier: BUSL-1.1

import {TimeSeries} from '@api/statistics/types';
import {UserGrowthStatsActions} from '@store/modules/Stats/actions';
import {getUserGrowthStatsSelector} from '@store/modules/Stats/selectors';
import {timeSeriesToUsersData} from '@store/modules/Stats/selectors/timeSeriesToGraphData';
import {StatsPeriod, UsersBarGraphData} from '@store/modules/Stats/types';
import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useGetBarGraphDataForStatsPeriod(
  statsPeriod: StatsPeriod,
): UsersBarGraphData {
  const timeSeries: TimeSeries[] = useSelector(
    getUserGrowthStatsSelector(statsPeriod),
  );

  const usersBarGraphData: UsersBarGraphData = useMemo(() => {
    return timeSeriesToUsersData({
      timeSeries: timeSeries,
      statsPeriod,
    });
  }, [timeSeries, statsPeriod]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      UserGrowthStatsActions.GET_USER_GROWTH_STATS.START.create(statsPeriod),
    );
  }, [dispatch, statsPeriod]);

  return usersBarGraphData;
}
