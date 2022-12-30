// SPDX-License-Identifier: BUSL-1.1

import {WalkThroughStepData} from '@store/modules/WalkThrough/types';
import {t} from '@translations/i18n';

export const WALK_THROUGH_STEPS_VERSIONS: {
  [walkThroughType: string]: {[step: number]: WalkThroughStepData};
} = {
  news: {
    [1]: {
      version: 1,
      title: t('walkthrough.news.step_1.title'),
      description: t('walkthrough.news.step_1.description'),
    },
    [2]: {
      version: 1,
      title: t('walkthrough.news.step_2.title'),
      description: t('walkthrough.news.step_2.description'),
    },
  },
  team: {
    [1]: {
      version: 1,
      title: t('walkthrough.team.step_1.title'),
      description: t('walkthrough.team.step_1.description'),
    },
    [2]: {
      version: 1,
      title: t('walkthrough.team.step_2.title'),
      description: t('walkthrough.team.step_2.description'),
    },
    [3]: {
      version: 1,
      title: t('walkthrough.team.step_3.title'),
      description: t('walkthrough.team.step_3.description'),
    },
    [4]: {
      version: 1,
      title: t('walkthrough.team.step_4.title'),
      description: t('walkthrough.team.step_4.description'),
    },
    [5]: {
      version: 1,
      title: t('walkthrough.team.step_5.title'),
      description: t('walkthrough.team.step_5.description'),
      link: 'https://ice.io/#invite',
      linkText: t('news.read_more'),
    },
    [6]: {
      version: 1,
      title: t('walkthrough.team.step_6.title'),
      description: t('walkthrough.team.step_5.description'),
      link: 'https://ice.io/#invite',
      linkText: t('news.read_more'),
    },
    [7]: {
      version: 1,
      title: t('walkthrough.team.step_7.title'),
      description: t('walkthrough.team.step_7.description'),
    },
    [8]: {
      version: 1,
      title: t('walkthrough.team.step_8.title'),
      description: t('walkthrough.team.step_8.description'),
    },
    [9]: {
      version: 1,
      title: t('walkthrough.team.step_9.title'),
      description: t('walkthrough.team.step_9.description'),
    },
  },
};

export const WALK_THROUGH_NUMBER_OF_STEPS: {[walkThroughType: string]: number} =
  {
    news: 2,
    team: 9,
  };
