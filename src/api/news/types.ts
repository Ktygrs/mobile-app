// SPDX-License-Identifier: BUSL-1.1

import {ImageSourcePropType} from 'react-native';

/**
 * The news post type
 */
export interface NewsPost {
  id: string;
  title: string | null;
  description?: string | null;
  placeholderUrl?: string | null;
  createdAt?: Date | null;
  illustration: ImageSourcePropType | null;
  unread?: boolean;
}
