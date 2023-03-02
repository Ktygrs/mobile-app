// SPDX-License-Identifier: BUSL-1.1

import {RefreshControl} from '@components/RefreshControl';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Achievements} from '@screens/HomeFlow/Home/components/Achievements';
import {HomeHeader} from '@screens/HomeFlow/Home/components/Header';
import {Overview} from '@screens/HomeFlow/Home/components/Overview';
import {PAGE_HEIGHT, Pager} from '@screens/HomeFlow/Home/components/Pager';
import {Team} from '@screens/HomeFlow/Home/components/Team';
import {useHomeRefresh} from '@screens/HomeFlow/Home/hooks/useHomeRefresh';
import {useScrollHandler} from '@screens/HomeFlow/Home/hooks/useScrollHandler';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

export const Home = memo(() => {
  useFocusStatusBar({style: 'dark-content'});
  const tabBarOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, translateY} = useScrollHandler();
  const {onRefresh, refreshing} = useHomeRefresh();

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
          <Achievements />
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
