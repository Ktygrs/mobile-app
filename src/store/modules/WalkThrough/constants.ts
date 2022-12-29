// SPDX-License-Identifier: BUSL-1.1

export const WALK_THROUGH_STEPS_VERSIONS: {
  [walkThroughType: string]: {[step: number]: number};
} = {
  news: {
    [1]: 1,
    [2]: 1,
  },
  team: {
    [1]: 1,
    [2]: 1,
    [3]: 1,
    [4]: 1,
    [5]: 1,
    [6]: 1,
    [7]: 1,
    [8]: 1,
    [9]: 1,
  },
};

export const WALK_THROUGH_NUMBER_OF_STEPS: {[walkThroughType: string]: number} =
  {
    news: 2,
    team: 9,
  };
