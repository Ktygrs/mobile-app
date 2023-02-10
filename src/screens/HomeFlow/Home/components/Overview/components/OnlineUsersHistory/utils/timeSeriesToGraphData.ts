// SPDX-License-Identifier: BUSL-1.1

import {TimeSeries} from '@api/statistics/types';
import {BarGraphData} from '@components/BarGraph/types';
import {dayjs} from '@services/dayjs';
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
  if (!timeSeries?.length) {
    return {
      activeUsersData: EMPTY_TIME_SERIES[statsPeriod],
      totalUsersData: EMPTY_TIME_SERIES[statsPeriod],
    };
  }

  const activeUsersData: BarGraphData[] = timeSeries.map(({date, active}) => {
    return {
      label: dayjs(date).format('MM/DD'),
      value: active,
    };
  });

  const totalUsersData: BarGraphData[] = timeSeries.map(({date, total}) => {
    return {
      label: dayjs(date).format('MM/DD'),
      value: total,
    };
  });

  return {
    activeUsersData,
    totalUsersData,
  };
}
