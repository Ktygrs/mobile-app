// SPDX-License-Identifier: BUSL-1.1

import {Badge, BadgeCategory} from '@api/badges/types';
import {Images} from '@images';
import {t} from '@translations/i18n';
import {capitalizeFirstLetter} from '@utils/string';

export const CATEGORIES: ReadonlyArray<{text: string; key: BadgeCategory}> = [
  {text: capitalizeFirstLetter(t('global.social')), key: 'social'},
  {text: capitalizeFirstLetter(t('global.coins')), key: 'coins'},
  {text: capitalizeFirstLetter(t('global.level')), key: 'level'},
];

export const BADGES: {[key in BadgeCategory]: Badge[]} = {
  social: [
    {
      title: 'ice Breaker',
      description: '< 3 ice friends',
      imageSource: Images.badges.iceBreaker.active,
      progressValue: 89.24,
      progressText: '',
      category: 'social',
      active: true,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      imageSource: Images.badges.troubleMaker.active,
      progressValue: 11.23,
      progressText: '',
      category: 'social',
      active: true,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      imageSource: Images.badges.snowyPlow.active,
      progressValue: 5.67,
      progressText: '',
      category: 'social',
      active: true,
    },
    {
      title: 'Frozen Max',
      description: '25-50 ice friends',
      imageSource: Images.badges.frozenMax.active,
      progressValue: 5.67,
      progressText: '',
      category: 'social',
      active: true,
    },
    {
      title: 'Cool Breeze',
      description: '50-100 ice friends',
      imageSource: Images.badges.coolBreeze.inactive,
      progressValue: 1.04,
      progressText: '',
      category: 'social',
      active: false,
    },
    {
      title: 'Big Contender',
      description: '100-250 ice friends',
      imageSource: Images.badges.bigContender.inactive,
      progressValue: 0.48,
      progressText: '',
      category: 'social',
      active: false,
    },
    {
      title: 'Mastermind',
      description: '100-250 ice friends',
      imageSource: Images.badges.mastermind.inactive,
      progressValue: 0.48,
      progressText: '',
      category: 'social',
      active: false,
    },
  ],
  coins: [
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      imageSource: Images.roles.ambassador,
      progressValue: 11.23,
      progressText: '',
      category: 'coins',
      active: true,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      imageSource: Images.roles.ambassador,
      progressValue: 42.23,
      progressText: '',
      category: 'coins',
      active: true,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      imageSource: Images.roles.ambassador,
      progressValue: 42.23,
      progressText: '',
      category: 'coins',
      active: true,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      imageSource: Images.roles.ambassador,
      progressValue: 42.23,
      progressText: '',
      category: 'coins',
      active: false,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      imageSource: Images.roles.ambassador,
      progressValue: 42.23,
      progressText: '',
      category: 'coins',
      active: false,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      imageSource: Images.roles.ambassador,
      progressValue: 72.23,
      progressText: '',
      category: 'coins',
      active: false,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      imageSource: Images.roles.ambassador,
      progressValue: 72.23,
      progressText: '',
      category: 'coins',
      active: false,
    },
  ],
  level: [
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      imageSource: Images.roles.ambassador,
      progressValue: 26.11,
      progressText: '',
      category: 'level',
      active: true,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      imageSource: Images.roles.ambassador,
      progressValue: 26.11,
      progressText: '',
      category: 'level',
      active: true,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      imageSource: Images.roles.ambassador,
      progressValue: 26.11,
      progressText: '',
      category: 'level',
      active: true,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      imageSource: Images.roles.ambassador,
      progressValue: 26.11,
      progressText: '',
      category: 'level',
      active: false,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      imageSource: Images.roles.ambassador,
      progressValue: 26.11,
      progressText: '',
      category: 'level',
      active: false,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      imageSource: Images.roles.ambassador,
      progressValue: 26.11,
      progressText: '',
      category: 'level',
      active: false,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      imageSource: Images.roles.ambassador,
      progressValue: 26.11,
      progressText: '',
      category: 'level',
      active: false,
    },
  ],
};
