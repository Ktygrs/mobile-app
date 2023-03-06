// SPDX-License-Identifier: BUSL-1.1

import {AchievementType} from '@api/achievements/types';
import {iconForType} from '@screens/HomeFlow/Home/components/Achievements/achievements';
import {memo} from 'react';

type Props = {
  type: AchievementType;
};

export const AchievementIcon = memo(({type}: Props) => {
  const icon = iconForType(type);
  return icon;
});
