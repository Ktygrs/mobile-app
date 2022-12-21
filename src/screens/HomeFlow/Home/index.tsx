// SPDX-License-Identifier: BUSL-1.1

import {commonStyles} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {HomeHeader} from '@screens/HomeFlow/Home/components/Header';
import {Overview} from '@screens/HomeFlow/Home/components/Overview';
import {PAGE_HEIGHT, Pager} from '@screens/HomeFlow/Home/components/Pager';
import {Tasks} from '@screens/HomeFlow/Home/components/Tasks';
import {Team} from '@screens/HomeFlow/Home/components/Team';
import {useScrollHandler} from '@screens/HomeFlow/Home/hooks/useScrollHandler';
import React, {memo} from 'react';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';

export const Home = memo(() => {
  useFocusStatusBar({style: 'dark-content'});
  const tabBarOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, translateY} = useScrollHandler();
  return (
    <>
      <HomeHeader translateY={translateY} transitionOffset={PAGE_HEIGHT} />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tabBarOffset.current}>
        <Pager />
        <View style={commonStyles.baseSubScreen}>
          <Overview translateY={translateY} topOffset={PAGE_HEIGHT} />
          <Team />
          <Tasks />
        </View>
      </Animated.ScrollView>
    </>
  );
});
