// SPDX-License-Identifier: BUSL-1.1

import {
  BalanceHistoryPoint,
  BalanceSummary,
  MiningSummary,
  PreStakingSummary,
  RankingSummary,
} from '@api/tokenomics/types';
import {createAction} from '@store/utils/actions/createAction';

const GET_MINING_SUMMARY = createAction('GET_MINING_SUMMARY', {
  START: (payload?: {forceUpdate?: boolean}) => payload,
  SUCCESS: (miningSummary: MiningSummary | null) => ({miningSummary}),
  FAILED: (errorMessage: string) => ({errorMessage}),
  RESET: true,
});

const GET_BALANCE_SUMMARY = createAction('GET_BALANCE_SUMMARY', {
  START: true,
  SUCCESS: (balanceSummary: BalanceSummary) => ({balanceSummary}),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const GET_PRE_STAKING_SUMMARY = createAction('GET_PRE_STAKING_SUMMARY', {
  START: true,
  SUCCESS: (preStakingSummary: PreStakingSummary | null) => ({
    preStakingSummary,
  }),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const GET_RANKING_SUMMARY = createAction('GET_RANKING_SUMMARY', {
  START: (payload?: {userId: string}) => payload,
  SUCCESS: (payload: {userId: string; rankingSummary: RankingSummary | null}) =>
    payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const GET_BALANCE_HISTORY = createAction('GET_BALANCE_HISTORY', {
  START: (payload: {offset: number; startDate: string; endDate: string}) =>
    payload,
  SUCCESS: (payload: {
    offset: number;
    startDate: string;
    endDate: string;
    hasNext: boolean;
    data: BalanceHistoryPoint[];
  }) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const START_MINING_SESSION = createAction('START_MINING_SESSION', {
  START: (params?: {resurrect?: boolean}) => params,
  SUCCESS: (miningSummary: MiningSummary | null) => ({miningSummary}),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const START_OR_UPDATE_PRE_STAKING = createAction(
  'START_OR_UPDATE_PRE_STAKING',
  {
    START: (params: {years: number; allocation: number}) => params,
    SUCCESS: (preStakingSummary: PreStakingSummary) => ({preStakingSummary}),
    FAILED: (errorMessage: string) => ({errorMessage}),
  },
);

export const TokenomicsActions = Object.freeze({
  GET_MINING_SUMMARY,
  GET_BALANCE_SUMMARY,
  GET_PRE_STAKING_SUMMARY,
  GET_RANKING_SUMMARY,
  GET_BALANCE_HISTORY,
  START_MINING_SESSION,
  START_OR_UPDATE_PRE_STAKING,
});
