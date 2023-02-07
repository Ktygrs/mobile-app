// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';

interface Response {
  count: number;
}

interface QueryParams {
  createdAfter?: string;
}

interface Params extends QueryParams {
  language: string;
}

export function getUnreadNewsCount({language, ...qParams}: Params) {
  return get<Response>(`/unread-news-count/${language}`, {
    ...qParams,
  });
}
