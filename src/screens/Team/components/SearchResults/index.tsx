// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {UserListItemSkeleton} from '@components/ListItems/UserListItem';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {SearchUserItem} from '@screens/Team/components/SearchResults/components/SearchUserItem';
import {CollectionActions} from '@store/modules/Collections';
import {collectionSelector} from '@store/modules/Collections/selectors';
import {t} from '@translations/i18n';
import React, {memo, useCallback} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {rem} from 'rn-units';

export const SearchResults = memo(() => {
  const {
    data,
    searchQuery,
    error,
    hasNext,
    loadNext,
    loadNextLoading,
    refresh,
    refreshing,
  } = useFetchCollection({
    selector: collectionSelector('usersSearch'),
    action: CollectionActions.SEARCH_USERS,
  });

  const renderItem = useCallback(({item}: {item: User}) => {
    return <SearchUserItem user={item} key={item.id} />;
  }, []);

  const renderEmptyList = useCallback(() => {
    if (!searchQuery) {
      return null;
    }
    if (hasNext) {
      return (
        <>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <UserListItemSkeleton key={index} />
            ))}
        </>
      );
    }
    return <Text>{t('search.nothing_is_found', {query: searchQuery})}</Text>;
  }, [hasNext, searchQuery]);

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, styles.container]}
      entering={FadeIn}
      exiting={FadeOut}>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={data}
          keyboardDismissMode={'on-drag'}
          renderItem={renderItem}
          ListFooterComponent={loadNextLoading ? ActivityIndicator : null}
          ListEmptyComponent={renderEmptyList}
          refreshing={refreshing}
          onRefresh={refresh}
          onEndReached={loadNext}
        />
      )}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: rem(20),
    borderTopRightRadius: rem(20),
    bottom: -2000,
    paddingBottom: 2000,
    zIndex: 1,
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    paddingVertical: rem(24),
  },
});
