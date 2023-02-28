// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughSteps} from '@store/modules/WalkThrough/types';
import {t} from '@translations/i18n';

export const WALK_THROUGH_STEPS: WalkThroughSteps = {
  news: {
    ['a1']: {
      version: 100,
      title: t('walkthrough.news.step_1.title'),
      description: t('walkthrough.news.step_1.description'),
    },
    ['a2']: {
      version: 100,
      title: t('walkthrough.news.step_2.title'),
      description: t('walkthrough.news.step_2.description'),
    },
  },
  team: {
    allowContactsButton: {
      version: 100,
      title: t('walkthrough.team.step_1.title'),
      description: t('walkthrough.team.step_1.description'),
    },
    referrals: {
      version: 100,
      title: t('walkthrough.team.step_2.title'),
      description: t('walkthrough.team.step_2.description'),
    },
    ['a3']: {
      version: 100,
      title: t('walkthrough.team.step_3.title'),
      description: t('walkthrough.team.step_3.description'),
    },
    contacts: {
      version: 100,
      title: t('walkthrough.team.step_4.title'),
      description: t('walkthrough.team.step_4.description'),
    },
    tierone: {
      version: 100,
      title: t('walkthrough.team.step_5.title'),
      description: t('walkthrough.team.step_5.description'),
      link: 'https://ice.io/#invite',
      linkText: t('news.read_more'),
    },
    tiertwo: {
      version: 100,
      title: t('walkthrough.team.step_6.title'),
      description: t('walkthrough.team.step_5.description'),
      link: 'https://ice.io/#invite',
      linkText: t('news.read_more'),
    },
    ['a7']: {
      version: 100,
      title: t('walkthrough.team.step_7.title'),
      description: t('walkthrough.team.step_7.description'),
    },
    ['a8']: {
      version: 100,
      title: t('walkthrough.team.step_8.title'),
      description: t('walkthrough.team.step_8.description'),
    },
    ['a9']: {
      version: 100,
      title: t('walkthrough.team.step_9.title'),
      description: t('walkthrough.team.step_9.description'),
    },
  },
  home: {},
};
