// SPDX-License-Identifier: BUSL-1.1

import {AchievementType} from '@api/achievements/types';
import {COLORS} from '@constants/colors';
import {InviteIcon} from '@svg/InviteIcon';
import {LogoIcon} from '@svg/LogoIcon';
import {TelegramSvg} from '@svg/Telegram';
import {TwitterIcon} from '@svg/TwitterIcon';
import {UserCircleSvg} from '@svg/UserCircle';
import {VerifiedUserSvg} from '@svg/VerifiedUser';
import {t} from '@translations/i18n';
import React from 'react';

export type AchievementInfo = {
  title: string;
  description: string;
  iconBgColor: string;
};

export const achievements: {[key in AchievementType]: AchievementInfo} = {
  claim_username: {
    title: t('home.steps.step_one.title'),
    description: t('home.steps.step_one.description'),
    iconBgColor: COLORS.dodgerBlue,
  },
  start_mining: {
    title: t('home.steps.step_two.title'),
    description: t('home.steps.step_two.description'),
    iconBgColor: COLORS.downriver,
  },
  upload_profile_picture: {
    title: t('home.steps.step_three.title'),
    description: t('home.steps.step_three.description'),
    iconBgColor: COLORS.gullGray,
  },
  follow_us_on_twitter: {
    title: t('home.steps.step_five.title'),
    description: t('home.steps.step_five.description'),
    iconBgColor: COLORS.toreaBay,
  },
  join_telegram: {
    title: t('home.steps.step_four.title'),
    description: t('home.steps.step_four.description'),
    iconBgColor: COLORS.royalBlue,
  },
  invite_friends: {
    title: t('home.steps.step_six.title'),
    description: t('home.steps.step_six.description'),
    iconBgColor: COLORS.blueViolet,
  },
};

export const iconForType = (type: AchievementType) => {
  let icon = null;
  switch (type) {
    case 'claim_username':
      icon = <VerifiedUserSvg />;
      break;
    case 'start_mining':
      icon = <LogoIcon color={COLORS.white} width={24} height={24} />;
      break;
    case 'upload_profile_picture':
      icon = <UserCircleSvg />;
      break;
    case 'follow_us_on_twitter':
      icon = <TwitterIcon width={20} height={20} fill={COLORS.white} />;
      break;
    case 'join_telegram':
      icon = <TelegramSvg />;
      break;
    case 'invite_friends':
      icon = <InviteIcon fill={COLORS.white} width={21} height={20} />;
      break;
  }
  return icon;
};
