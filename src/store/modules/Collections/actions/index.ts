// SPDX-License-Identifier: BUSL-1.1

import {createAction} from '@store/utils/actions/createAction';

const createActionStructure = <T>() => ({
  START: ({
    offset,
    limit,
    query = '',
  }: {
    offset: number;
    limit?: number;
    query?: string;
  }) => ({
    query,
    limit,
    offset,
  }),
  SUCCESS: (
    result: T[],
    {query, offset, hasNext}: {query: string; offset: number; hasNext: boolean},
  ) => ({result, query, offset, hasNext}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
  CLEAR: false,
});

export const createCollectionAction = <T>(key: string) =>
  createAction(key, createActionStructure<T>());
