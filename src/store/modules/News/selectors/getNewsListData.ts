// SPDX-License-Identifier: BUSL-1.1

import {createSelector} from '@reduxjs/toolkit';

import {getNewsPostsByIds} from './getNewsPostsByIds';

interface NewsPostItem {
  type: 'newsPost';
  id: string;
}

export const getNewsListData = createSelector(
  [getNewsPostsByIds],
  (_): NewsPostItem[] => [],
);
