// SPDX-License-Identifier: BUSL-1.1

import {Miner} from '@api/statistics/types';
import {
  UserListItemCompact,
  UserListItemCompactSkeleton,
} from '@components/ListItems/UserListItemCompact';
import {CollectionList} from '@screens/Templates/CollectionList';
import {CollectionActions} from '@store/modules/Collections';
import {collectionSelector} from '@store/modules/Collections/selectors';
import {t} from '@translations/i18n';
import React, {memo} from 'react';

export const TopMiners = memo(() => {
  return (
    <CollectionList
      headerTitle={t('stats.top_miners')}
      searchPlaceholder={t('search.search_for_users')}
      selector={collectionSelector('minersSearch')}
      action={CollectionActions.SEARCH_MINERS}
      renderItem={renderListItem}
      SkeletonItem={UserListItemCompactSkeleton}
    />
  );
});

const renderListItem = ({item}: {item: Miner}) => (
  <UserListItemCompact
    name={item.username}
    profilePictureUrl={item.profilePictureUrl}
    iceAmount={item.iceAmount}
  />
);
