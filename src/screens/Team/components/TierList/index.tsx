// SPDX-License-Identifier: BUSL-1.1

import {ReferralType, User} from '@api/user/types';
import {
  FLAG_FONT_SIZE,
  FLAG_MARGIN_LEFT,
  UserListItem,
  UserListItemSkeleton,
} from '@components/ListItems/UserListItem';
import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {WalkThroughContext} from '@contexts/WalkThroughContext';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {EmptyTier} from '@screens/Team/components/TierList/components/EmptyTier';
import {ListHeader} from '@screens/Team/components/TierList/components/Header';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {PingIcon} from '@svg/PingIcon';
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  referralType: ReferralType;
  emptyTitle: string;
  headerTitle: string;
  focused: boolean;
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
    offset: propsOffset,
  }: Props) => {
    const tabbarOffset = useBottomTabBarOffsetStyle();
    const addSteps = referralType === 'T1';
    const offset = propsOffset + CONTAINER_PADDING_TOP;

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

    useEffect(() => {
      if (focused) {
        fetch({offset: 0});
      }
    }, [fetch, focused]);

    const [headerHeight, setHeaderHeight] = useState(0);
    const pingButton = useMemo(() => {
      if (referrals?.length) {
        return <UserListPingButton pinged={referrals[0].pinged} />;
      }
      return null;
    }, [referrals]);

    const {addStepData} = useContext(WalkThroughContext);
    useEffect(() => {
      if (addSteps && offset && pingButton && headerHeight) {
        const top = offset + headerHeight - PADDING_VERTICAL;
        addStepData({
          step: 9,
          stepData: {
            version: 1,
            top,
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
    }, [addStepData, addSteps, offset, pingButton, headerHeight]);

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
      return (
        <ListHeader
          total={total ?? 0}
          active={active ?? 0}
          title={headerTitle}
          addSteps={addSteps}
          offset={offset}
          onLayout={({nativeEvent}) => {
            setHeaderHeight(nativeEvent.layout.height);
          }}
        />
      );
    }, [total, active, headerTitle, addSteps, offset]);

    if (error) {
      return <Text>{error}</Text>;
    }

    if (!referrals.length) {
      if (hasNext) {
        return (
          <View style={styles.flex}>
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
  flex: {
    flex: 1,
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
});
