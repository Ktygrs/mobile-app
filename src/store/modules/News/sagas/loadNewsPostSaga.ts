// SPDX-License-Identifier: BUSL-1.1

import {NewsActions} from '@store/modules/News/actions';
import {getErrorMessage} from '@utils/errors';
import {put} from 'redux-saga/effects';

const actionCreator = NewsActions.NEWS_POST_LOAD(null).START.create;

export function* loadNewsPostSaga(action: ReturnType<typeof actionCreator>) {
  // const {postId} = action.payload;
  try {
    // const response: NewsPost = yield Api.news.getNewsPost(postId);
    const response = {
      id: '1',
      title: '',
      description: '',
      placeholderUrl: '',
      illustration: null,
    };
    yield put(
      NewsActions.NEWS_POST_LOAD(action.id).SUCCESS.create({
        newsPost: response,
      }),
    );
  } catch (error) {
    yield put(
      NewsActions.NEWS_POST_LOAD(action.id).FAILED.create(
        getErrorMessage(error),
      ),
    );
    throw error;
  }
}
