// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {navigate} from '@navigation/utils';
import {WalkThroughStepStaticData} from '@store/modules/WalkThrough/types';
import {AddressBookIcon} from '@svg/AddressBookIcon';
import {ContactsIcon} from '@svg/ContactsIcon';
import {PingIcon} from '@svg/PingIcon';
import {TeamInactiveIcon} from '@svg/TeamInactiveIcon';
import {TierOneIcon} from '@svg/TierOneIcon';
import {TierTwoIcon} from '@svg/TierTwoIcon';
import {WalletIcon} from '@svg/WalletIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {rem} from 'rn-units';

export const WALK_THROUGH_STEPS: WalkThroughStepStaticData[] = [
  {
    key: 'allowContacts',
    version: 117,
    Icon: <AddressBookIcon color={COLORS.primaryLight} />,
    title: t('walkthrough.team.allow_contacts.title'),
    description: t('walkthrough.team.allow_contacts.description'),
  },
  {
    key: 'confirmPhone',
    version: 117,
    Icon: (
      <PingIcon fill={COLORS.primaryDark} height={rem(16)} width={rem(16)} />
    ),
    title: t('walkthrough.team.confirm_phone.title'),
    description: t('walkthrough.team.confirm_phone.description'),
  },
  {
    key: 'contactsList',
    version: 117,
    Icon: (
      <PingIcon fill={COLORS.primaryDark} height={rem(16)} width={rem(16)} />
    ),
    title: t('walkthrough.team.contacts_list.title'),
    description: t('walkthrough.team.contacts_list.description'),
  },
  {
    key: 'referrals',
    version: 117,
    Icon: (
      <TeamInactiveIcon
        width={rem(32)}
        height={rem(32)}
        color={COLORS.primaryDark}
      />
    ),
    title: t('walkthrough.team.referrals.title'),
    description: t('walkthrough.team.referrals.description'),
    link: 'https://ice.io/#invite',
  },
  {
    key: 'earnings',
    version: 117,
    Icon: (
      <WalletIcon width={rem(20)} height={rem(20)} color={COLORS.primaryDark} />
    ),
    title: t('walkthrough.team.earnings.title'),
    description: t('walkthrough.team.earnings.description'),
  },
  {
    key: 'contacts',
    version: 117,
    Icon: (
      <ContactsIcon width={rem(20)} height={rem(20)} color={COLORS.secondary} />
    ),
    title: t('walkthrough.team.contacts.title'),
    description: t('walkthrough.team.contacts.description'),
  },
  {
    key: 'tierone',
    version: 117,
    Icon: (
      <TierOneIcon width={rem(20)} height={rem(20)} fill={COLORS.secondary} />
    ),
    title: t('walkthrough.team.tier_one.title'),
    description: t('walkthrough.team.tier_one.description'),
    link: 'https://ice.io/#invite',
  },
  {
    key: 'tiertwo',
    version: 117,
    Icon: (
      <TierTwoIcon width={rem(20)} height={rem(20)} fill={COLORS.secondary} />
    ),
    title: t('walkthrough.team.tier_two.title'),
    description: t('walkthrough.team.tier_two.description'),
    link: 'https://ice.io/#invite',
    after: () => {
      navigate({name: 'Team', params: {segmentIndex: 1}});
    },
  },
  {
    key: 'activeUsers',
    version: 117,
    title: t('walkthrough.team.active_users.title'),
    description: t('walkthrough.team.active_users.description'),
  },
  {
    key: 'tierOneEarnings',
    version: 117,
    title: t('walkthrough.team.tier_one_earnings.title'),
    description: t('walkthrough.team.tier_one_earnings.description'),
  },
  {
    key: 'ping',
    version: 117,
    Icon: (
      <PingIcon fill={COLORS.primaryDark} height={rem(16)} width={rem(16)} />
    ),
    title: t('walkthrough.team.ping.title'),
    description: t('walkthrough.team.ping.description'),
  },
];
