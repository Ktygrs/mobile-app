// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {
  UserListItem,
  UserListItemSkeleton,
} from '@components/ListItems/UserListItem';
import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {CollectionActions} from '@store/modules/Collections';
import {collectionSelector} from '@store/modules/Collections/selectors';
import {t} from '@translations/i18n';
import React, {memo, useCallback} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {rem} from 'rn-units';

export const SEARCH_RESULTS_OFFSET = rem(16);

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
    return (
      <UserListItem
        user={item}
        AdditionalInfoComponent={
          item.pinged != null && <UserListPingButton pinged={item.pinged} />
        }
        key={item.id}
      />
    );
  }, []);

  const renderEmptyList = useCallback(() => {
    if (!searchQuery) {
      return null;
    }
    if (hasNext) {
      return (
        <>
          {Array(10)
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
      style={[
        StyleSheet.absoluteFill,
        commonStyles.baseSubScreen,
        styles.container,
      ]}
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
          onRefresh={searchQuery ? refresh : () => {}}
          onEndReached={loadNext}
        />
      )}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    bottom: -2000, // margin-bottom makes pull-to-refresh works wrong
    paddingBottom: 2000,
    zIndex: 1,
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    paddingVertical: rem(24),
  },
});
