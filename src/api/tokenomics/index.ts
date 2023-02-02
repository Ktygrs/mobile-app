// SPDX-License-Identifier: BUSL-1.1

import {getBalanceHistory} from './getBalanceHistory';
import {getBalanceSummary} from './getBalanceSummary';
import {getMiningSummary} from './getMiningSummary';
import {getPreStakingSummary} from './getPreStakingSummary';
import {getRankingSummary} from './getRankingSummary';
import {startMiningSession} from './startMiningSession';
import {startOrUpdatePreStaking} from './startOrUpdatePreStaking';

export const tokenomics = Object.freeze({
  getMiningSummary,
  getBalanceSummary,
  startMiningSession,
  getPreStakingSummary,
  getRankingSummary,
  getBalanceHistory,
  startOrUpdatePreStaking,
});
