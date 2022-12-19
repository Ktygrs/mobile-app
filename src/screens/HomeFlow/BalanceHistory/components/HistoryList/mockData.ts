// SPDX-License-Identifier: BUSL-1.1

export type BalanceDiff = {
  amount: string;
  bonus: number;
  negative: boolean;
};

export type BalanceHistoryPoint = {
  time: string;
  balance: BalanceDiff;
  timeSeries?: BalanceHistoryPoint[];
};

export const MOCK_HISTORY: BalanceHistoryPoint[] = [
  {
    time: '2022-01-03T16:20:52.156534Z',
    balance: {
      amount: '1,234.22',
      bonus: 2211,
      negative: true,
    },
    timeSeries: [
      {
        time: '2022-01-03T12:20:52.156534Z',
        balance: {
          amount: '1,234.22',
          bonus: 24,
          negative: false,
        },
      },
      {
        time: '2022-01-03T13:20:52.156534Z',
        balance: {
          amount: '234.99',
          bonus: 124,
          negative: true,
        },
      },
      {
        time: '2022-01-03T14:20:52.156534Z',
        balance: {
          amount: '1,234.22',
          bonus: -24,
          negative: false,
        },
      },
      {
        time: '2022-01-03T15:20:52.156534Z',
        balance: {
          amount: '1,234.22',
          bonus: 24,
          negative: true,
        },
      },
    ],
  },
  {
    time: '2022-01-04T16:20:52.156534Z',
    balance: {
      amount: '1,234.22',
      bonus: 256,
      negative: true,
    },
    timeSeries: [
      {
        time: '2022-01-04T12:20:52.156534Z',
        balance: {
          amount: '1,234.22',
          bonus: 24,
          negative: false,
        },
      },
      {
        time: '2022-01-04T13:20:52.156534Z',
        balance: {
          amount: '234.99',
          bonus: 124,
          negative: true,
        },
      },
      {
        time: '2022-01-04T14:20:52.156534Z',
        balance: {
          amount: '1,234.22',
          bonus: -24,
          negative: false,
        },
      },
      {
        time: '2022-01-04T15:20:52.156534Z',
        balance: {
          amount: '1,234.22',
          bonus: 24,
          negative: true,
        },
      },
    ],
  },
];
