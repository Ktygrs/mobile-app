// SPDX-License-Identifier: BUSL-1.1

import {Badge, BadgeCategory} from '@api/badges/types';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {t} from '@translations/i18n';
import {capitalizeFirstLetter} from '@utils/string';
import React from 'react';
import {Text} from 'react-native';
import {isAndroid} from 'rn-units';

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
      description: (
        <Text>
          {'4-9 '}
          <IceLabel
            color={COLORS.secondary}
            iconSize={12}
            iconOffsetY={isAndroid ? 3 : 2}
          />
          {' friends'}
        </Text>
      ),
      imageSource: Images.badges.troubleMaker.active,
      progressValue: 11.23,
      progressText: '',
      category: 'social',
      active: true,
    },
    {
      title: 'Snowy Plower',
      description: (
        <Text>
          {'10-24 '}
          <IceLabel
            color={COLORS.secondary}
            iconSize={12}
            iconOffsetY={isAndroid ? 3 : 2}
          />
          {' friends'}
        </Text>
      ),
      imageSource: Images.badges.snowyPlow.active,
      progressValue: 5.67,
      progressText: '',
      category: 'social',
      active: true,
    },
    {
      title: 'Frozen Max',
      description: (
        <Text>
          {'25-50 '}
          <IceLabel
            color={COLORS.secondary}
            iconSize={12}
            iconOffsetY={isAndroid ? 3 : 2}
          />
          {' friends'}
        </Text>
      ),
      imageSource: Images.badges.frozenMax.active,
      progressValue: 5.67,
      progressText: '',
      category: 'social',
      active: true,
    },
    {
      title: 'Cool Breeze',
      description: (
        <Text>
          {'50-100 '}
          <IceLabel
            color={COLORS.secondary}
            iconSize={12}
            iconOffsetY={isAndroid ? 3 : 2}
          />
          {' friends'}
        </Text>
      ),
      imageSource: Images.badges.coolBreeze.inactive,
      progressValue: 1.04,
      progressText: '',
      category: 'social',
      active: false,
    },
    {
      title: 'Big Contender',
      description: (
        <Text>
          {'100-250 '}
          <IceLabel
            color={COLORS.secondary}
            iconSize={12}
            iconOffsetY={isAndroid ? 3 : 2}
          />
          {' friends'}
        </Text>
      ),
      imageSource: Images.badges.bigContender.inactive,
      progressValue: 0.48,
      progressText: '',
      category: 'social',
      active: false,
    },
    {
      title: 'Mastermind',
      description: (
        <Text>
          {'250+ '}
          <IceLabel
            color={COLORS.secondary}
            iconSize={12}
            iconOffsetY={isAndroid ? 3 : 2}
          />
          {' friends'}
        </Text>
      ),
      imageSource: Images.badges.mastermind.inactive,
      progressValue: 0.48,
      progressText: '',
      category: 'social',
      active: false,
    },
  ],
  coins: [
    {
      title: 'ice Breaker',
      description: '< 3 coins',
      imageSource: Images.badges.iceBreaker.active,
      progressValue: 11.23,
      progressText: '',
      category: 'coins',
      active: true,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 coins',
      imageSource: Images.badges.troubleMaker.active,
      progressValue: 42.23,
      progressText: '',
      category: 'coins',
      active: true,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 coins',
      imageSource: Images.badges.snowyPlow.active,
      progressValue: 42.23,
      progressText: '',
      category: 'coins',
      active: true,
    },
    {
      title: 'Frozen Max',
      description: '25-50 coins',
      imageSource: Images.badges.frozenMax.active,
      progressValue: 42.23,
      progressText: '',
      category: 'coins',
      active: false,
    },
    {
      title: 'Cool Breeze',
      description: '50-100 coins',
      imageSource: Images.badges.coolBreeze.inactive,
      progressValue: 42.23,
      progressText: '',
      category: 'coins',
      active: false,
    },
    {
      title: 'Big Contender',
      description: '100-250 coins',
      imageSource: Images.badges.bigContender.inactive,
      progressValue: 72.23,
      progressText: '',
      category: 'coins',
      active: false,
    },
    {
      title: 'Mastermind',
      description: '250+ coins',
      imageSource: Images.badges.mastermind.inactive,
      progressValue: 72.23,
      progressText: '',
      category: 'coins',
      active: false,
    },
  ],
  level: [
    {
      title: 'ice Breaker',
      description: 'Level 1',
      imageSource: Images.badges.iceBreaker.active,
      progressValue: 26.11,
      progressText: '',
      category: 'level',
      active: true,
    },
    {
      title: 'Trouble Maker',
      description: 'Level 2',
      imageSource: Images.badges.troubleMaker.active,
      progressValue: 26.11,
      progressText: '',
      category: 'level',
      active: true,
    },
    {
      title: 'Snowy Plower',
      description: 'Level 3',
      imageSource: Images.badges.snowyPlow.active,
      progressValue: 26.11,
      progressText: '',
      category: 'level',
      active: true,
    },
    {
      title: 'Frozen Max',
      description: 'Level 4',
      imageSource: Images.badges.frozenMax.active,
      progressValue: 26.11,
      progressText: '',
      category: 'level',
      active: false,
    },
    {
      title: 'Cool Breeze',
      description: 'Level 5',
      imageSource: Images.badges.coolBreeze.inactive,
      progressValue: 26.11,
      progressText: '',
      category: 'level',
      active: false,
    },
    {
      title: 'Big Contender',
      description: 'Level 6',
      imageSource: Images.badges.bigContender.inactive,
      progressValue: 26.11,
      progressText: '',
      category: 'level',
      active: false,
    },
    {
      title: 'Mastermind',
      description: 'Level 7',
      imageSource: Images.badges.mastermind.inactive,
      progressValue: 26.11,
      progressText: '',
      category: 'level',
      active: false,
    },
  ],
};
