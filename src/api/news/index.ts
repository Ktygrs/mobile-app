// SPDX-License-Identifier: BUSL-1.1

import {getNews} from './getNews';
import {getUnreadNewsCount} from './getUnreadNewsCount';
import {markViewed} from './markViewed';

export const news = Object.freeze({
  getNews,
  getUnreadNewsCount,
  markViewed,
});
