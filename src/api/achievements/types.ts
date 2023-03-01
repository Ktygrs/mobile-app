// SPDX-License-Identifier: BUSL-1.1

import {ReactNode} from 'react';

export interface Achievement {
  type: AchievementType;
  completed: boolean;
  data?: AchievementData;
  Icon?: ReactNode;
}

export type AchievementType =
  | 'claim_username'
  | 'start_mining'
  | 'upload_profile_picture'
  | 'follow_us_on_twitter'
  | 'join_telegram'
  | 'invite_friends';

export interface AchievementData {
  requiredQuantity?: number;
  telegramUserHandle?: string;
  twitterUserHandle?: string;
}
