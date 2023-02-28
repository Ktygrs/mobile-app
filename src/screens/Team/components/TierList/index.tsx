// SPDX-License-Identifier: BUSL-1.1

import {ReferralType} from '@api/user/types';
import {ActivityIndicator} from '@components/ActivityIndicator';
import {ListItemSkeleton} from '@components/ListItems/ListItemSkeleton';
import {
  FLAG_FONT_SIZE,
  FLAG_MARGIN_LEFT,
  SKELETONS_PER_SCREEN,
  UserListItem,
} from '@components/ListItems/UserListItem';
import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {COLORS} from '@constants/colors';
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
import {useSetWalkthroughElementData} from '@store/modules/WalkThrough/hooks/useSetWalkthroughElementData';
import {PingIcon} from '@svg/PingIcon';
import {formatNumberString} from '@utils/numbers';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  referralType: ReferralType;
  emptyTitle: string;
  headerTitle: string;
  focused: boolean;
  addCollapsedSnapPointListener: (key: string, listener: () => void) => void;
  offset: number;
};

const CONTAINER_PADDING_TOP = rem(16);
const BORDER_RADIUS = 20;
const PADDING_VERTICAL = rem(12);

export const TierList = memo(
  ({
    referralType,
    emptyTitle,
    headerTitle,
    focused,
    addCollapsedSnapPointListener,
    offset: propsOffset,
  }: Props) => {
    const tabbarOffset = useBottomTabBarOffsetStyle();
    const addSteps = referralType === 'T1';
    const offset = propsOffset + CONTAINER_PADDING_TOP;

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

    const [headerHeight, setHeaderHeight] = useState(0);
    //TODO:walk check + cleanup
    const pingButton = useMemo(() => {
      if (referrals?.length) {
        return <UserListPingButton userId={referrals[0]} />;
      }
      return null;
    }, [referrals]);

    const {setWalkthroughElementData} = useSetWalkthroughElementData('team');
    useEffect(() => {
      if (addSteps && offset && pingButton && headerHeight) {
        const top = offset + headerHeight - PADDING_VERTICAL;
        setWalkthroughElementData({
          step: 'a9',
          elementData: {
            topPositionOfHighlightedElement: top,
            icon: (
              <PingIcon
                fill={COLORS.primaryDark}
                height={rem(16)}
                width={rem(16)}
              />
            ),
            renderStepHighlight: () => (
              <View style={styles.walkthroughElementOuterContainer}>
                <View style={[styles.walkthroughElementContainer, {top}]}>
                  <View style={[styles.walkthroughElementInnerContainer]}>
                    {pingButton}
                  </View>
                </View>
              </View>
            ),
          },
        });
      }
    }, [setWalkthroughElementData, addSteps, offset, pingButton, headerHeight]);

    const renderItem: ListRenderItem<typeof referrals[0]> = useCallback(
      ({item: userId}) => {
        return (
          <UserListItem
            userId={userId}
            AdditionalInfoComponent={<UserListPingButton userId={userId} />}
          />
        );
      },
      [],
    );

    //TODO:walk cleanup
    const Header = useMemo(() => {
      const balance = balanceSummary?.[referralType === 'T1' ? 't1' : 't2'];
      return (
        <ListHeader
          total={total ?? 0}
          active={active ?? 0}
          title={headerTitle}
          addSteps={addSteps}
          offset={offset}
          earnings={balance ? formatNumberString(balance) : ''}
          onLayout={({nativeEvent}) => {
            setHeaderHeight(nativeEvent.layout.height);
          }}
        />
      );
    }, [
      balanceSummary,
      referralType,
      total,
      active,
      headerTitle,
      addSteps,
      offset,
    ]);

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
                  <ListItemSkeleton key={index} />
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
    paddingTop: CONTAINER_PADDING_TOP,
  },
  walkthroughElementOuterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: FLAG_MARGIN_LEFT + rem(FLAG_FONT_SIZE),
  },
  walkthroughElementContainer: {
    paddingHorizontal: SCREEN_SIDE_OFFSET / 2,
    paddingVertical: PADDING_VERTICAL,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white02opacity,
  },
  walkthroughElementInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SCREEN_SIDE_OFFSET / 2,
    borderRadius: BORDER_RADIUS,
    paddingVertical: PADDING_VERTICAL,
    backgroundColor: COLORS.white,
  },
  loadingIndicator: {
    alignItems: 'center',
    flex: 1,
  },
});
