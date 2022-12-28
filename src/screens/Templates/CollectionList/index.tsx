// SPDX-License-Identifier: BUSL-1.1

import {SearchInput} from '@components/Inputs/SearchInput';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {RootState} from '@store/rootReducer';
import {ActionFactories} from '@store/utils/actions/createAction';
import {t} from '@translations/i18n';
import debounce from 'lodash/debounce';
import React, {useCallback, useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {rem} from 'rn-units';

type Props<T> = {
  headerTitle: string;
  searchPlaceholder: string;
  selector: (state: RootState) => {
    data: T[];
    hasNext: boolean;
    query?: string;
  };
  action: ActionFactories<
    string,
    {START: (params: {query?: string; offset: number}) => unknown}
  >;
  renderItem: ListRenderItem<T>;
  SkeletonItem: () => JSX.Element;
};

export const CollectionList = <T,>({
  headerTitle,
  searchPlaceholder,
  selector,
  action,
  renderItem,
  SkeletonItem,
}: Props<T>) => {
  useFocusStatusBar({style: 'dark-content'});
  const tabbarOffset = useBottomTabBarOffsetStyle();

  const {
    data,
    hasNext,
    searchQuery,
    fetch,
    refresh,
    refreshing,
    loadNext,
    loadNextLoading,
  } = useFetchCollection<T>({selector, action});

  useEffect(() => {
    fetch({offset: 0});
  }, [fetch]);

  const search = useMemo(
    () => debounce((query: string) => fetch({query, offset: 0}), 600),
    [fetch],
  );

  const renderEmptyList = useCallback(() => {
    return (
      <View style={styles.emptyList}>
        {hasNext ? (
          Array(5)
            .fill(null)
            .map((_, index) => <SkeletonItem key={index} />)
        ) : (
          <Text>
            {t('search.nothing_is_found', {query: searchQuery ?? ''})}
          </Text>
        )}
      </View>
    );
  }, [hasNext, SkeletonItem, searchQuery]);

  return (
    <View style={styles.container}>
      <Header title={headerTitle} />
      <SearchInput
        containerStyle={styles.searchInput}
        placeholder={searchPlaceholder}
        onChangeText={search}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[tabbarOffset.current, styles.listContent]}
        data={data}
        keyboardDismissMode={'on-drag'}
        renderItem={renderItem}
        onEndReached={loadNext}
        onRefresh={refresh}
        refreshing={refreshing}
        ListFooterComponent={loadNextLoading ? ActivityIndicator : null}
        ListEmptyComponent={renderEmptyList}
        initialNumToRender={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginVertical: rem(8),
  },
  emptyList: {
    marginTop: rem(8),
  },
  listContent: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: -rem(8),
  },
});
