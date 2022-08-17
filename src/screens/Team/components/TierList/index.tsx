// SPDX-License-Identifier: BUSL-1.1

import {ReferralType, User} from '@api/user/types';
import {UserListItem, UserListItemSkeleton} from '@components/UserListItem';
import {UserListPingButton} from '@components/UserListItem/components/UserListPingButton';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {EmptyTier} from '@screens/Team/components/TierList/components/EmptyTier';
import {ListHeader} from '@screens/Team/components/TierList/components/Header';
import {useReferrals} from '@screens/Team/components/TierList/hooks/useReferrals';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
    const {referrals, error, loadNext, loadNextLoading, refresh, refreshing} =
      useReferrals(referralType, focused);

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
          total={referrals?.total ?? 0}
          active={referrals?.active ?? 0}
          title={headerTitle}
        />
      );
    }, [referrals?.total, referrals?.active, headerTitle]);

    if (!referrals) {
      if (error) {
        //TODO::error handling (component?)
        return <Text>{error}</Text>;
      } else {
        return (
          <View style={styles.userList}>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <UserListItemSkeleton key={index} />
              ))}
          </View>
        );
      }
    } else {
      if (!referrals.total) {
        return <EmptyTier title={emptyTitle} />;
      } else {
        return (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[tabbarOffset.current]}
            ListHeaderComponent={Header}
            ListFooterComponent={loadNextLoading ? ActivityIndicator : null}
            style={styles.userList}
            data={referrals.referrals}
            renderItem={renderItem}
            onEndReached={loadNext}
            onRefresh={refresh}
            refreshing={refreshing}
          />
        );
      }
    }
  },
);

const styles = StyleSheet.create({
  userList: {
    marginTop: rem(22),
    flex: 1,
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
});
