// SPDX-License-Identifier: BUSL-1.1

import {ReferralType, User} from '@api/user/types';
import {
  UserListItem,
  UserListItemSkeleton,
} from '@components/ListItems/UserListItem';
import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {EmptyTier} from '@screens/Team/components/TierList/components/EmptyTier';
import {ListHeader} from '@screens/Team/components/TierList/components/Header';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {formatNumberString} from '@utils/numbers';
import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
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

    const balanceSummary = useSelector(balanceSummarySelector);

    useEffect(() => {
      if (focused) {
        fetch({offset: 0});
      }
    }, [fetch, focused]);

    const renderItem = useCallback(({item}: {item: User}) => {
      return (
        <UserListItem
          user={item}
          AdditionalInfoComponent={
            item.pinged != null && <UserListPingButton pinged={item.pinged} />
          }
        />
      );
    }, []);

    const Header = useMemo(() => {
      const balance = balanceSummary?.[referralType === 'T1' ? 't1' : 't2'];
      return (
        <ListHeader
          total={total ?? 0}
          active={active ?? 0}
          title={headerTitle}
          earnings={balance ? formatNumberString(balance) : ''}
        />
      );
    }, [total, active, headerTitle, balanceSummary, referralType]);

    if (error) {
      return <Text>{error}</Text>;
    }

    if (!referrals.length) {
      if (hasNext) {
        return (
          <View style={styles.container}>
            {Array(10)
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
      <BottomSheetFlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[tabbarOffset.current, styles.container]}
        ListHeaderComponent={Header}
        ListFooterComponent={loadNextLoading ? ActivityIndicator : null}
        data={referrals}
        renderItem={renderItem}
        onEndReached={loadNext}
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    paddingTop: rem(16),
  },
});
