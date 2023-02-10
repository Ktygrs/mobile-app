// SPDX-License-Identifier: BUSL-1.1

import {DEFAULT_BACK_OFF_OPTIONS, get, isApiError} from '@api/client';
import {BalanceHistoryPoint} from '@api/tokenomics/types';

type Params = {
  userId: string;
  startDate?: string | null;
  endDate?: string | null;
  limit?: number | null;
  offset?: number | null;
  tz: string;
};

export function getBalanceHistory({
  userId,
  startDate,
  endDate,
  limit,
  offset,
  tz,
}: Params) {
  return get<BalanceHistoryPoint[]>(
    `/tokenomics/${userId}/balance-history`,
    {
      startDate,
      endDate,
      limit,
      offset,
      tz,
    },
    {
      ...DEFAULT_BACK_OFF_OPTIONS,
      retry: error =>
        DEFAULT_BACK_OFF_OPTIONS.retry(error) ||
        isApiError(error, 404, 'USER_NOT_FOUND'),
    },
  );
}
