// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {navigate} from '@navigation/utils';
import {WalkThroughStepStaticData} from '@store/modules/WalkThrough/types';
import {AddressBookIcon} from '@svg/AddressBookIcon';
import {CheckMarkFramedIcon} from '@svg/CheckMarkFramedIcon';
import {ContactsIcon} from '@svg/ContactsIcon';
import {PingIcon} from '@svg/PingIcon';
import {SonarIcon} from '@svg/SonarIcon';
import {TeamIcon} from '@svg/TeamIcon';
import {TierOneIcon} from '@svg/TierOneIcon';
import {TierTwoIcon} from '@svg/TierTwoIcon';
import {WalletIcon} from '@svg/WalletIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {rem, wait} from 'rn-units';

export const WALK_THROUGH_STEPS: WalkThroughStepStaticData[] = [
  {
    key: 'referrals',
    version: 8,
    Icon: <TeamIcon width={rem(26)} height={rem(26)} />,
    title: t('walkthrough.team.referrals.title'),
    description: t('walkthrough.team.referrals.description'),
    link: 'https://ice.io/#invite',
  },
  {
    key: 'earnings',
    version: 8,
    Icon: <WalletIcon width={rem(24)} height={rem(24)} />,
    title: t('walkthrough.team.earnings.title'),
    description: t('walkthrough.team.earnings.description'),
  },
  {
    key: 'contacts',
    version: 8,
    Icon: <ContactsIcon width={rem(24)} height={rem(24)} />,
    title: t('walkthrough.team.contacts.title'),
    description: t('walkthrough.team.contacts.description'),
  },
  {
    key: 'tierone',
    version: 8,
    Icon: <TierOneIcon width={rem(32)} height={rem(32)} />,
    title: t('walkthrough.team.tier_one.title'),
    description: t('walkthrough.team.tier_one.description'),
    link: 'https://ice.io/#invite',
  },
  {
    key: 'tiertwo',
    version: 8,
    Icon: <TierTwoIcon width={rem(32)} height={rem(32)} />,
    title: t('walkthrough.team.tier_two.title'),
    description: t('walkthrough.team.tier_two.description'),
    link: 'https://ice.io/#invite',
  },
  {
    key: 'allowContacts',
    version: 8,
    Icon: <AddressBookIcon />,
    title: t('walkthrough.team.allow_contacts.title'),
    description: t('walkthrough.team.allow_contacts.description'),
  },
  {
    key: 'confirmPhone',
    version: 8,
    Icon: <CheckMarkFramedIcon />,
    title: t('walkthrough.team.confirm_phone.title'),
    description: t('walkthrough.team.confirm_phone.description'),
  },
  {
    key: 'contactsList',
    version: 8,
    Icon: <ContactsIcon height={rem(24)} width={rem(24)} />,
    title: t('walkthrough.team.contacts_list.title'),
    description: t('walkthrough.team.contacts_list.description'),
    circlePosition: 'bottom',
    before: () => {
      navigate({name: 'Team', params: {snapPoint: 1}});
      return wait(500);
    },
    after: () => {
      navigate({name: 'Team', params: {snapPoint: 0}});
      return wait(500);
    },
  },
  {
    key: 'activeUsers',
    version: 8,
    Icon: <SonarIcon />,
    title: t('walkthrough.team.active_users.title'),
    description: t('walkthrough.team.active_users.description'),
  },
  {
    key: 'tierOneEarnings',
    version: 8,
    Icon: <TierOneIcon width={rem(32)} height={rem(32)} />,
    title: t('walkthrough.team.tier_one_earnings.title'),
    description: t('walkthrough.team.tier_one_earnings.description'),
  },
  {
    key: 'ping',
    version: 8,
    Icon: <PingIcon color={COLORS.white} height={rem(21)} width={rem(18)} />,
    title: t('walkthrough.team.ping.title'),
    description: t('walkthrough.team.ping.description'),
  },
];
