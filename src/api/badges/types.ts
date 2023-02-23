// SPDX-License-Identifier: BUSL-1.1

import {ReactNode} from 'react';
import {ImageSourcePropType} from 'react-native';

export type Badge = {
  title: string;
  description: string | ReactNode;
  imageSource: ImageSourcePropType;
  progressValue: number;
  progressText: string;
  active: boolean;
  category: BadgeCategory;
  imageInactive?: ImageSourcePropType;
};

export type BadgeCategory = 'social' | 'coins' | 'level';
