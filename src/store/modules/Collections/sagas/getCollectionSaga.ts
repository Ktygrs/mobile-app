// SPDX-License-Identifier: BUSL-1.1

import {actionsMap, CollectionAction} from '@store/modules/Collections';
import {getErrorMessage} from '@utils/errors';
import {put, SagaReturnType} from 'redux-saga/effects';

const DEFAULT_PAGE_SIZE = 20;

export type CollectionApiRequest = (params: {
  query: string;
  limit: number;
  offset: number;
}) => Promise<unknown[]>;

export function* getCollectionSaga(
  action: CollectionAction,
  {payload}: ReturnType<CollectionAction['START']['create']>,
) {
  try {
    const {offset, limit = DEFAULT_PAGE_SIZE, query} = payload;
    const {request} = actionsMap.get(action) ?? {};
    if (request) {
      const response: SagaReturnType<typeof request> = yield request({
        query,
        offset,
        limit,
      });
      const hasNext = response.length === limit;
      // @ts-ignore
      yield put(action.SUCCESS.create(response, {query, offset, hasNext}));
    }
  } catch (error) {
    yield put(action.FAILED.create(getErrorMessage(error)));
    throw error;
  }
}
