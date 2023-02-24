// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {InviteIcon} from '@svg/InviteIcon';
import {LogoIcon} from '@svg/LogoIcon';
import {TelegramSvg} from '@svg/Telegram';
import {TwitterIcon} from '@svg/TwitterIcon';
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
    type: 'claimUsername',
    completed: true,
    active: false,
    Icon: <VerifiedUserSvg />,
    iconBackground: COLORS.dodgerBlue,
    title: t('home.steps.step_one.title'),
    description: t('home.steps.step_one.description'),
  },
  {
    type: 'startMining',
    completed: true,
    active: false,
    Icon: <LogoIcon color={COLORS.white} width={24} height={24} />,
    iconBackground: COLORS.downriver,
    title: t('home.steps.step_two.title'),
    description: t('home.steps.step_two.description'),
  },
  {
    type: 'profilePicture',
    completed: true,
    active: false,
    Icon: <UserCircleSvg />,
    iconBackground: COLORS.gullGray,
    title: t('home.steps.step_three.title'),
    description: t('home.steps.step_three.description'),
  },
  {
    type: 'followUsTwitter',
    completed: true,
    active: false,
    Icon: <TwitterIcon width={20} height={20} fill={COLORS.white} />,
    iconBackground: COLORS.toreaBay,
    title: t('home.steps.step_five.title'),
    description: t('home.steps.step_five.description'),
  },
  {
    type: 'joinTelegram',
    completed: true,
    active: false,
    Icon: <TelegramSvg />,
    iconBackground: COLORS.royalBlue,
    title: t('home.steps.step_four.title'),
    description: t('home.steps.step_four.description'),
  },
  {
    type: 'invite5Friends',
    completed: false,
    active: false,
    Icon: <InviteIcon fill={COLORS.white} width={21} height={20} />,
    iconBackground: COLORS.blueViolet,
    title: t('home.steps.step_six.title'),
    description: t('home.steps.step_six.description'),
  },
];
