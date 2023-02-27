// SPDX-License-Identifier: BUSL-1.1

import {Badge, BadgeCategory} from '@api/badges/types';
import {t} from '@translations/i18n';
import {capitalizeFirstLetter} from '@utils/string';

export const CATEGORIES: ReadonlyArray<{text: string; key: BadgeCategory}> = [
  {text: capitalizeFirstLetter(t('global.social')), key: 'social'},
  {text: capitalizeFirstLetter(t('global.coins')), key: 'coin'},
  {text: capitalizeFirstLetter(t('global.level')), key: 'level'},
];

export const BADGES: {[key in BadgeCategory]: Badge[]} = {
  social: [
    {
      name: 'ice Breaker',
      type: 'social',
      achieved: true,
      percentageOfUsersInProgress: 57.94,
      achievingRange: {
        toInclusive: 5,
      },
    },
    {
      name: 'Trouble Maker',
      type: 'social',
      achieved: true,
      percentageOfUsersInProgress: 23.0,
      achievingRange: {
        fromInclusive: 6,
        toInclusive: 15,
      },
    },
    {
      name: 'Snowy Plower',
      type: 'social',
      achieved: true,
      percentageOfUsersInProgress: 11.0,
      achievingRange: {
        fromInclusive: 16,
        toInclusive: 30,
      },
    },
    {
      name: 'Arctic Prankster',
      type: 'social',
      achieved: true,
      percentageOfUsersInProgress: 6.13,
      achievingRange: {
        fromInclusive: 31,
        toInclusive: 100,
      },
    },
    {
      name: 'Glacial Polly',
      type: 'social',
      achieved: true,
      percentageOfUsersInProgress: 1.2,
      achievingRange: {
        fromInclusive: 101,
        toInclusive: 250,
      },
    },
    {
      name: 'Frosty Smacker',
      type: 'social',
      achieved: false,
      percentageOfUsersInProgress: 0.52,
      achievingRange: {
        fromInclusive: 251,
        toInclusive: 500,
      },
    },
    {
      name: 'Polar Machine',
      type: 'social',
      achieved: false,
      percentageOfUsersInProgress: 0.16,
      achievingRange: {
        fromInclusive: 501,
        toInclusive: 1000,
      },
    },
    {
      name: 'North Storm',
      type: 'social',
      achieved: false,
      percentageOfUsersInProgress: 0.033,
      achievingRange: {
        fromInclusive: 1001,
        toInclusive: 2000,
      },
    },
    {
      name: 'Snow Fall',
      type: 'social',
      achieved: false,
      percentageOfUsersInProgress: 0.012,
      achievingRange: {
        fromInclusive: 2001,
        toInclusive: 10000,
      },
    },
    {
      name: 'ice Legend',
      type: 'social',
      achieved: false,
      percentageOfUsersInProgress: 0.005,
      achievingRange: {
        fromInclusive: 10001,
      },
    },
  ],
  coin: [
    {
      name: 'Poor George',
      type: 'coin',
      achieved: true,
      percentageOfUsersInProgress: 57.94,
      achievingRange: {
        toInclusive: 1000,
      },
    },
    {
      name: 'Frozen Purse',
      type: 'coin',
      achieved: true,
      percentageOfUsersInProgress: 23.0,
      achievingRange: {
        fromInclusive: 1001,
        toInclusive: 5000,
      },
    },
    {
      name: 'Arctic Assistant',
      type: 'coin',
      achieved: true,
      percentageOfUsersInProgress: 11.0,
      achievingRange: {
        fromInclusive: 5001,
        toInclusive: 10000,
      },
    },
    {
      name: 'iceCube Swagger',
      type: 'coin',
      achieved: true,
      percentageOfUsersInProgress: 6.13,
      achievingRange: {
        fromInclusive: 10001,
        toInclusive: 40000,
      },
    },
    {
      name: 'Polar Consultant',
      type: 'coin',
      achieved: false,
      percentageOfUsersInProgress: 1.2,
      achievingRange: {
        fromInclusive: 40001,
        toInclusive: 80000,
      },
    },
    {
      name: 'Igloo Broker',
      type: 'coin',
      achieved: false,
      percentageOfUsersInProgress: 0.52,
      achievingRange: {
        fromInclusive: 80001,
        toInclusive: 160000,
      },
    },
    {
      name: 'Snowy Accountant',
      type: 'coin',
      achieved: false,
      percentageOfUsersInProgress: 0.16,
      achievingRange: {
        fromInclusive: 160001,
        toInclusive: 320000,
      },
    },
    {
      name: 'Winter Banker',
      type: 'coin',
      achieved: false,
      percentageOfUsersInProgress: 0.033,
      achievingRange: {
        fromInclusive: 320001,
        toInclusive: 640000,
      },
    },
    {
      name: 'Cold Director',
      type: 'coin',
      achieved: false,
      percentageOfUsersInProgress: 0.012,
      achievingRange: {
        fromInclusive: 640001,
        toInclusive: 1280000,
      },
    },
    {
      name: 'Richie Rich',
      type: 'coin',
      achieved: false,
      percentageOfUsersInProgress: 0.005,
      achievingRange: {
        fromInclusive: 1280001,
      },
    },
  ],
  level: [
    {
      name: 'ice Soldier',
      type: 'level',
      achieved: true,
      percentageOfUsersInProgress: 57.94,
      achievingRange: {
        toInclusive: 1,
      },
    },
    {
      name: 'Wind Sergeant',
      type: 'level',
      achieved: true,
      percentageOfUsersInProgress: 23.0,
      achievingRange: {
        fromInclusive: 2,
        toInclusive: 5,
      },
    },
    {
      name: 'Snow Lieutenant',
      type: 'level',
      achieved: false,
      percentageOfUsersInProgress: 11.0,
      achievingRange: {
        fromInclusive: 6,
        toInclusive: 10,
      },
    },
    {
      name: 'Flake Colonel',
      type: 'level',
      achieved: false,
      percentageOfUsersInProgress: 6.13,
      achievingRange: {
        fromInclusive: 11,
        toInclusive: 15,
      },
    },
    {
      name: 'Frost General',
      type: 'level',
      achieved: false,
      percentageOfUsersInProgress: 1.41,
      achievingRange: {
        fromInclusive: 16,
        toInclusive: 20,
      },
    },
    {
      name: 'ice Commander',
      type: 'level',
      achieved: false,
      percentageOfUsersInProgress: 0.52,
      achievingRange: {
        fromInclusive: 21,
      },
    },
  ],
};
