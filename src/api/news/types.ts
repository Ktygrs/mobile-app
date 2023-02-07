// SPDX-License-Identifier: BUSL-1.1

export type NewsArticleType = 'regular' | 'featured';

export interface NewsArticle {
  createdAt: string;
  id: string;
  imageUrl: string;
  language: string;
  title: string;
  type: NewsArticleType;
  url: string;
  viewed: boolean;
  views: number;
}
