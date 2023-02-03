// SPDX-License-Identifier: BUSL-1.1

import {ReferralType, User} from '@api/user/types';
import {ActivityIndicator} from '@components/ActivityIndicator';
import {
  SKELETONS_PER_SCREEN,
  UserListItem,
  UserListItemSkeleton,
} from '@components/ListItems/UserListItem';
import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from '@gorhom/bottom-sheet';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {EmptyTier} from '@screens/Team/components/TierList/components/EmptyTier';
import {ListHeader} from '@screens/Team/components/TierList/components/Header';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {formatNumberString} from '@utils/numbers';
import React, {memo, useCallback, useEffect, useMemo, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  referralType: ReferralType;
  emptyTitle: string;
  headerTitle: string;
  focused: boolean;
  addCollapsedSnapPointListener: (key: string, listener: () => void) => void;
};

export const TierList = memo(
  ({
    referralType,
    emptyTitle,
    headerTitle,
    focused,
    addCollapsedSnapPointListener,
  }: Props) => {
    const tabbarOffset = useBottomTabBarOffsetStyle();

    const ref = useRef<BottomSheetFlatListMethods>(null);
    useEffect(() => {
      addCollapsedSnapPointListener(referralType, () => {
        if (ref.current) {
          ref.current.scrollToOffset({animated: true, offset: 0});
        }
      });
    }, [ref, addCollapsedSnapPointListener, referralType]);

    const {
      fetch,
      data: referrals,
      error,
      hasNext,
      loadNext,
      refreshing,
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

    const hasBeenFetchedRef = useRef(false);
    useEffect(() => {
      if (focused && !hasBeenFetchedRef.current) {
        hasBeenFetchedRef.current = true;
        fetch({offset: 0});
      }
    }, [fetch, focused, hasBeenFetchedRef]);

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

    return (
      <BottomSheetFlatList
        ref={ref}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[tabbarOffset.current, styles.container]}
        ListHeaderComponent={Header}
        ListFooterComponent={
          loadNextLoading ? (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator />
            </View>
          ) : null
        }
        ListEmptyComponent={
          hasNext ? (
            <View style={styles.flex}>
              {Array(SKELETONS_PER_SCREEN)
                .fill(null)
                .map((_, index) => (
                  <UserListItemSkeleton key={index} />
                ))}
            </View>
          ) : (
            <EmptyTier title={emptyTitle} />
          )
        }
        data={referrals}
        renderItem={renderItem}
        onEndReached={loadNext}
        refreshing={refreshing}
      />
    );
  },
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  container: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    paddingTop: rem(16),
  },
  loadingIndicator: {
    alignItems: 'center',
    flex: 1,
  },
});
