// SPDX-License-Identifier: BUSL-1.1

import {TimeSeries} from '@api/statistics/types';
import {BarGraphData} from '@components/BarGraph/types';
import {STATS_PERIODS} from '@store/modules/Stats/constants';
import {StatsPeriod, UsersBarGraphData} from '@store/modules/Stats/types';
import {getPreviousDate} from '@utils/date';

export function getEmptyData(statsPeriod: StatsPeriod): BarGraphData[] {
  return Array(statsPeriod)
    .fill(null)
    .map((_, i) => {
      return {
        label: getPreviousDate(i),
        value: 0,
      };
    });
}

const EMPTY_TIME_SERIES: {[key: number]: BarGraphData[]} = {};
STATS_PERIODS.forEach(
  (period: StatsPeriod) => (EMPTY_TIME_SERIES[period] = getEmptyData(period)),
);

export function timeSeriesToUsersData({
  timeSeries,
  statsPeriod,
}: {
  timeSeries: TimeSeries[];
  statsPeriod: StatsPeriod;
}): UsersBarGraphData {
  const activeUsersData = timeSeries?.length
    ? timeSeries.map((ts: TimeSeries, index: number) => {
        return {
          label: getPreviousDate(index),
          value: ts.active,
        };
      })
    : EMPTY_TIME_SERIES[statsPeriod];
  const totalUsersData = timeSeries?.length
    ? timeSeries.map((ts: TimeSeries, index: number) => {
        return {
          label: getPreviousDate(index),
          value: ts.total,
        };
      })
    : EMPTY_TIME_SERIES[statsPeriod];

  return {activeUsersData, totalUsersData};
}
