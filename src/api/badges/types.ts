// SPDX-License-Identifier: BUSL-1.1

export type Badge = {
  name: string;
  type: BadgeType;
  achieved: boolean;
  percentageOfUsersInProgress: number;
  achievingRange: {
    fromInclusive?: number;
    toInclusive?: number;
  };
};

export type BadgeType = 'social' | 'coin' | 'level';

export type SummaryBadge = {
  name: string;
  type: BadgeType;
  index: number;
  lastIndex: number;
};
