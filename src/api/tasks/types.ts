// SPDX-License-Identifier: BUSL-1.1

export interface Task {
  name: string;
  completed: boolean;
  data: TaskData;
}

export interface TaskData {
  requiredQuantity?: number;
  telegramUserHandle?: string;
  twitterUserHandle?: string;
}
