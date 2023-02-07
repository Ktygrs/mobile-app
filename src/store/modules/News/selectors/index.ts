// SPDX-License-Identifier: BUSL-1.1

import {getFeaturedNewsArticle} from './getFeaturedNewsArticle';
import {getNewsArticle} from './getNewsArticle';
import {getNewsByIds} from './getNewsByIds';
import {getNewsIds} from './getNewsIds';
import {getUnreadCount} from './getUnreadCount';
import {hasMoreToLoad} from './hasMoreToLoad';

export const NewsSelectors = Object.freeze({
  getFeaturedNewsArticle,
  getNewsArticle,
  getNewsByIds,
  getNewsIds,
  getUnreadCount,
  hasMoreToLoad,
});
