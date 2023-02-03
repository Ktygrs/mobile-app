// SPDX-License-Identifier: BUSL-1.1

import {RefreshControl} from '@components/RefreshControl';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useRefresh} from '@hooks/useRefresh';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {HomeHeader} from '@screens/HomeFlow/Home/components/Header';
import {Overview} from '@screens/HomeFlow/Home/components/Overview';
import {PAGE_HEIGHT, Pager} from '@screens/HomeFlow/Home/components/Pager';
import {Tasks} from '@screens/HomeFlow/Home/components/Tasks';
import {Team} from '@screens/HomeFlow/Home/components/Team';
import {useScrollHandler} from '@screens/HomeFlow/Home/hooks/useScrollHandler';
import {AccountActions} from '@store/modules/Account/actions';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {StatsActions} from '@store/modules/Stats/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

const REFRESH_ACTIONS = [
  TokenomicsActions.GET_BALANCE_SUMMARY,
  TokenomicsActions.GET_MINING_SUMMARY,
  TokenomicsActions.GET_PRE_STAKING_SUMMARY,
  TokenomicsActions.GET_RANKING_SUMMARY,
  AccountActions.GET_ACCOUNT,
  StatsActions.GET_ADOPTION,
  ReferralsActions.GET_REFERRALS({referralType: 'T1'})('T1'),
];

export const Home = memo(() => {
  useFocusStatusBar({style: 'dark-content'});
  const tabBarOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, translateY} = useScrollHandler();
  const {onRefresh, refreshing} = useRefresh(REFRESH_ACTIONS);

  return (
    <View style={styles.container}>
      <HomeHeader translateY={translateY} transitionOffset={PAGE_HEIGHT} />
      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={tabBarOffset.current}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            translateY={translateY}
          />
        }>
        <Pager />
        <View style={commonStyles.baseSubScreen}>
          <Overview translateY={translateY} topOffset={PAGE_HEIGHT} />
          <Team />
          <Tasks />
        </View>
      </Animated.ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
