// SPDX-License-Identifier: BUSL-1.1

import {TeamActions} from '@store/modules/Team/actions';
import {searchDataSelector} from '@store/modules/Team/selectors';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {useCallback, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useSearchUsers = () => {
  const dispatch = useDispatch();
  const {
    result: searchResults,
    query: searchQuery,
    hasNext,
  } = useSelector(searchDataSelector);
  const refreshingRef = useRef(false);
  const loadNextLoadingRef = useRef(false);

  const error = useSelector(
    failedReasonSelector.bind(null, TeamActions.SEARCH_USERS),
  );

  const loading = useSelector(
    isLoadingSelector.bind(null, TeamActions.SEARCH_USERS),
  );

  if (refreshingRef.current && !loading) {
    refreshingRef.current = false;
  }

  if (loadNextLoadingRef.current && !loading) {
    loadNextLoadingRef.current = false;
  }

  const loadNext = useCallback(() => {
    if (hasNext) {
      loadNextLoadingRef.current = true;
      dispatch(
        TeamActions.SEARCH_USERS.START.create({
          query: searchQuery,
          offset: searchResults.length,
        }),
      );
    }
  }, [dispatch, hasNext, searchQuery, searchResults.length]);

  const refresh = useCallback(() => {
    refreshingRef.current = true;
    dispatch(
      TeamActions.SEARCH_USERS.START.create({query: searchQuery, offset: 0}),
    );
  }, [dispatch, searchQuery]);

  const refreshing = loading && refreshingRef.current;
  const loadNextLoading = loading && loadNextLoadingRef.current;

  return {
    searchResults,
    searchQuery,
    error,
    loading,
    loadNext,
    loadNextLoading,
    refresh,
    refreshing,
  };
};
