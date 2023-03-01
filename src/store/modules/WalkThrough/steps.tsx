// SPDX-License-Identifier: BUSL-1.1

import {navigate} from '@navigation/utils';
import {WalkThroughSteps} from '@store/modules/WalkThrough/types';
import {t} from '@translations/i18n';

export const WALK_THROUGH_STEPS: WalkThroughSteps = [
  {
    key: 'allowContacts',
    version: 101,
    title: t('walkthrough.team.allow_contacts.title'),
    description: t('walkthrough.team.allow_contacts.description'),
  },
  {
    key: 'referrals',
    version: 101,
    title: t('walkthrough.team.referrals.title'),
    description: t('walkthrough.team.referrals.description'),
    link: 'https://ice.io/#invite',
  },
  {
    key: 'earnings',
    version: 101,
    title: t('walkthrough.team.earnings.title'),
    description: t('walkthrough.team.earnings.description'),
  },
  {
    key: 'contacts',
    version: 101,
    title: t('walkthrough.team.contacts.title'),
    description: t('walkthrough.team.contacts.description'),
  },
  {
    key: 'tierone',
    version: 101,
    title: t('walkthrough.team.tier_one.title'),
    description: t('walkthrough.team.tier_one.description'),
    link: 'https://ice.io/#invite',
  },
  {
    key: 'tiertwo',
    version: 101,
    title: t('walkthrough.team.tier_two.title'),
    description: t('walkthrough.team.tier_two.description'),
    link: 'https://ice.io/#invite',
    after: () => {
      navigate({name: 'Team', params: {segmentIndex: 1}});
    },
  },
  {
    key: 'activeUsers',
    version: 101,
    title: t('walkthrough.team.active_users.title'),
    description: t('walkthrough.team.active_users.description'),
  },
  {
    key: 'tierOneEarnings',
    version: 101,
    title: t('walkthrough.team.tier_one_earnings.title'),
    description: t('walkthrough.team.tier_one_earnings.description'),
  },
  {
    key: 'ping',
    version: 101,
    title: t('walkthrough.team.ping.title'),
    description: t('walkthrough.team.ping.description'),
  },
];