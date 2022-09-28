// SPDX-License-Identifier: BUSL-1.1

import {commonStyles} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {HomeHeader} from '@screens/HomeFlow/Home/components/Header';
import {Overview} from '@screens/HomeFlow/Home/components/Overview';
import {Tasks} from '@screens/HomeFlow/Home/components/Tasks';
import {Team} from '@screens/HomeFlow/Home/components/Team';
import {Wallet, WALLET_HEIGHT} from '@screens/HomeFlow/Home/components/Wallet';
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
      <HomeHeader translateY={translateY} transitionOffset={WALLET_HEIGHT} />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tabBarOffset.current}>
        <Wallet />
        <View style={commonStyles.baseSubScreen}>
          <Overview translateY={translateY} topOffset={WALLET_HEIGHT} />
          <Team />
          <Tasks />
        </View>
      </Animated.ScrollView>
    </>
  );
});
