// SPDX-License-Identifier: BUSL-1.1

export interface Achievement {
  name: string;
  completed: boolean;
  data: AchievementData;
}

export interface AchievementData {
  requiredQuantity?: number;
  telegramUserHandle?: string;
  twitterUserHandle?: string;
}
