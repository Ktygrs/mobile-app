// SPDX-License-Identifier: BUSL-1.1

import {navigate} from '@navigation/utils';
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
    allowContacts: {
      version: 100,
      title: t('walkthrough.team.allow_contacts.title'),
      description: t('walkthrough.team.allow_contacts.description'),
    },
    referrals: {
      version: 100,
      title: t('walkthrough.team.referrals.title'),
      description: t('walkthrough.team.referrals.description'),
      link: 'https://ice.io/#invite',
    },
    earnings: {
      version: 100,
      title: t('walkthrough.team.earnings.title'),
      description: t('walkthrough.team.earnings.description'),
    },
    contacts: {
      version: 100,
      title: t('walkthrough.team.contacts.title'),
      description: t('walkthrough.team.contacts.description'),
    },
    tierone: {
      version: 100,
      title: t('walkthrough.team.tier_one.title'),
      description: t('walkthrough.team.tier_one.description'),
      link: 'https://ice.io/#invite',
    },
    tiertwo: {
      version: 100,
      title: t('walkthrough.team.tier_two.title'),
      description: t('walkthrough.team.tier_two.description'),
      link: 'https://ice.io/#invite',
      after: () => {
        navigate({name: 'Team', params: {segmentIndex: 1}});
      },
    },
    activeUsers: {
      version: 100,
      title: t('walkthrough.team.active_users.title'),
      description: t('walkthrough.team.active_users.description'),
    },
    tierOneEarnings: {
      version: 100,
      title: t('walkthrough.team.tier_one_earnings.title'),
      description: t('walkthrough.team.tier_one_earnings.description'),
    },
    ping: {
      version: 100,
      title: t('walkthrough.team.ping.title'),
      description: t('walkthrough.team.ping.description'),
    },
  },
  home: {},
};
