// SPDX-License-Identifier: BUSL-1.1

import {BalanceHistoryPoint} from '@api/tokenomics/types';

export const getBalanceHistoryLength = (
  balanceHistory: BalanceHistoryPoint[],
) => {
  return balanceHistory.reduce(
    (total, point) => (total += point.timeSeries?.length ?? 0),
    0,
  );
};
