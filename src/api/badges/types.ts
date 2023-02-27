// SPDX-License-Identifier: BUSL-1.1

export type Badge = {
  name: string;
  type: string;
  achieved: boolean;
  percentageOfUsersInProgress: number;
  achievingRange: {
    fromInclusive?: number;
    toInclusive?: number;
  };
};

export type BadgeCategory = 'social' | 'coin' | 'level';

export type SummaryBadge = {
  name: string;
  type: BadgeCategory;
  index: number;
  lastIndex: number;
};
