// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {InviteFriendsSvg} from '@svg/InviteFriends';
import {LogoIcon} from '@svg/LogoIcon';
import {ShareSvg} from '@svg/Share';
import {TelegramSvg} from '@svg/Telegram';
import {TwitterIconSvg} from '@svg/TwitterIcon';
import {UserCircleSvg} from '@svg/UserCircle';
import {VerifiedUserSvg} from '@svg/VerifiedUser';
import {t} from '@translations/i18n';
import React, {ReactNode} from 'react';

export type Task = {
  type: string;
  completed: boolean;
  active: boolean;
  Icon: ReactNode;
  iconBackground: string;
  title: string;
  description: string;
};

export const taskItems: Task[] = [
  {
    type: 'claimYourNickname',
    completed: true,
    active: false,
    Icon: <VerifiedUserSvg />,
    iconBackground: COLORS.dodgerBlue,
    title: t('home.steps.step_seven.title'),
    description: t('home.steps.step_seven.description'),
  },
  {
    type: 'startMining',
    completed: false,
    active: true,
    Icon: <LogoIcon color={COLORS.white} width={24} height={24} />,
    iconBackground: COLORS.downriver,
    title: t('home.steps.step_one.title'),
    description: t('home.steps.step_one.description'),
  },
  {
    type: 'profilePicture',
    completed: false,
    active: false,
    Icon: <UserCircleSvg />,
    iconBackground: COLORS.gullGray,
    title: t('home.steps.step_two.title'),
    description: t('home.steps.step_two.description'),
  },
  {
    type: 'joinTelegram',
    completed: false,
    active: false,
    Icon: <TelegramSvg />,
    iconBackground: COLORS.royalBlue,
    title: t('home.steps.step_three.title'),
    description: t('home.steps.step_three.description'),
  },
  {
    type: 'followUsTwitter',
    completed: false,
    active: false,
    Icon: <TwitterIconSvg />,
    iconBackground: COLORS.toreaBay,
    title: t('home.steps.step_four.title'),
    description: t('home.steps.step_four.description'),
  },
  {
    type: 'invite5Friends',
    completed: false,
    active: false,
    Icon: <InviteFriendsSvg color={COLORS.white} />,
    iconBackground: COLORS.blueViolet,
    title: t('home.steps.step_five.title'),
    description: t('home.steps.step_five.description'),
  },
  {
    type: 'socialShare',
    completed: false,
    active: false,
    Icon: <ShareSvg />,
    iconBackground: COLORS.bittersweet,
    title: t('home.steps.step_six.title'),
    description: t('home.steps.step_six.description'),
  },
];
