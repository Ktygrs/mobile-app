// SPDX-License-Identifier: BUSL-1.1

import {NewsPost} from '@api/news/types';
import {NewsActions} from '@store/modules/News/actions';
import produce from 'immer';

export interface State {
  items: {
    [newsPostId: string]: NewsPost;
  };
  hasMore: boolean;
  searchQuery: string;
}

const actionCreatorNewsLoad = NewsActions.NEWS_LOAD.SUCCESS.create;
const actionCreatorFailedNewsLoad = NewsActions.NEWS_LOAD.FAILED.create;
const actionCreatorNewsPostLoad =
  NewsActions.NEWS_POST_LOAD(null).SUCCESS.create;
const actionCreatorFailedNewsPostLoad =
  NewsActions.NEWS_POST_LOAD(null).FAILED.create;

type Actions =
  | ReturnType<typeof actionCreatorNewsLoad>
  | ReturnType<typeof actionCreatorFailedNewsLoad>
  | ReturnType<typeof actionCreatorNewsPostLoad>
  | ReturnType<typeof actionCreatorFailedNewsPostLoad>;

const INITIAL_STATE: State = {
  items: {},
  hasMore: true,
  searchQuery: '',
};

export function newsReducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case NewsActions.NEWS_LOAD.SUCCESS.type:
        {
          const {news, hasMore, isRefresh} = action.payload;

          if (isRefresh) {
            draft.items = news;
          } else {
            draft.items = {
              ...news,
            };
          }

          draft.hasMore = hasMore;
        }
        break;
    }
  });
}
