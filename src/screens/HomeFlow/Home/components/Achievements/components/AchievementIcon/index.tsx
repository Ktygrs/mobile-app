// SPDX-License-Identifier: BUSL-1.1

import {AchievementType} from '@api/achievements/types';
import {COLORS} from '@constants/colors';
import {InviteIcon} from '@svg/InviteIcon';
import {LogoIcon} from '@svg/LogoIcon';
import {TelegramSvg} from '@svg/Telegram';
import {TwitterIcon} from '@svg/TwitterIcon';
import {UserCircleSvg} from '@svg/UserCircle';
import {VerifiedUserSvg} from '@svg/VerifiedUser';
import React, {memo} from 'react';

type Props = {
  type: AchievementType;
};

export const AchievementIcon = memo(({type}: Props) => {
  const iconForType = () => {
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
  return iconForType();
});
