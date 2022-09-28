// SPDX-License-Identifier: BUSL-1.1

import {ReferralType, User} from '@api/user/types';
import {
  UserListItem,
  UserListItemSkeleton,
} from '@components/ListItems/UserListItem';
import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {EmptyTier} from '@screens/Team/components/TierList/components/EmptyTier';
import {ListHeader} from '@screens/Team/components/TierList/components/Header';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  referralType: ReferralType;
  emptyTitle: string;
  headerTitle: string;
  focused: boolean;
};

export const TierList = memo(
  ({referralType, emptyTitle, headerTitle, focused}: Props) => {
    const tabbarOffset = useBottomTabBarOffsetStyle();

    const {
      fetch,
      data: referrals,
      error,
      hasNext,
      loadNext,
      loadNextLoading,
      refresh,
      refreshing,
    } = useFetchCollection(
      useMemo(
        () => ({
          selector: referralsSelector({referralType}),
          action: ReferralsActions.GET_REFERRALS({referralType})(referralType),
        }),
        [referralType],
      ),
    );

    const {total, active} = useSelector(referralsSelector({referralType}));

    useEffect(() => {
      if (focused) {
        fetch({offset: 0});
      }
    }, [fetch, focused]);

    const renderItem = useCallback(({item}: {item: User}) => {
      return (
        <UserListItem
          name={item.username}
          note={item.active ? t('users.active') : t('users.inactive')}
          profilePictureUrl={item.profilePictureUrl}
          active={item.active}
          AdditionalInfoComponent={<UserListPingButton pinged={item.pinged} />}
        />
      );
    }, []);

    const Header = useMemo(() => {
      return (
        <ListHeader
          total={total ?? 0}
          active={active ?? 0}
          title={headerTitle}
        />
      );
    }, [total, active, headerTitle]);

    if (error) {
      return <Text>{error}</Text>;
    }

    if (!referrals.length) {
      if (hasNext) {
        return (
          <View style={styles.userList}>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <UserListItemSkeleton key={index} />
              ))}
          </View>
        );
      } else {
        return <EmptyTier title={emptyTitle} />;
      }
    }

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[tabbarOffset.current]}
        ListHeaderComponent={Header}
        ListFooterComponent={loadNextLoading ? ActivityIndicator : null}
        style={styles.userList}
        data={referrals}
        renderItem={renderItem}
        onEndReached={loadNext}
        onRefresh={refresh}
        refreshing={refreshing}
      />
    );
  },
);

const styles = StyleSheet.create({
  userList: {
    marginTop: rem(22),
    flex: 1,
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
});
