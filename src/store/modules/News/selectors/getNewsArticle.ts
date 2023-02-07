// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

import {rootSelector} from './rootSelector';

export const getNewsArticle = (newsArticleId: string) => (state: RootState) =>
  rootSelector(state).items[newsArticleId];
