// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar/Avatar';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useTopOffsetStyle} from '@navigation/hooks/useTopOffsetStyle';
import {GreetingText} from '@screens/HomeFlow/Home/components/Header/components/GreetingText';
import {MenuButton} from '@screens/HomeFlow/Home/components/Header/components/MenuButton';
import {useTransitionAnimation} from '@screens/HomeFlow/Home/components/Header/hooks/useTransitionAnimation';
import {userSelector} from '@store/modules/Auth/selectors';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {SharedValue} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  translateY: SharedValue<number>;

  // scroll offset when to start transition animation from 1 state to another
  transitionOffset: number;
};

export const HomeHeader = memo(({translateY, transitionOffset}: Props) => {
  const topOffset = useTopOffsetStyle();
  const user = useSelector(userSelector);

  const {fromAnimatedStyle, toAnimatedStyle} = useTransitionAnimation({
    translateY,
    transitionOffset,
  });

  return (
    <View style={[styles.container, topOffset.current]}>
      <View style={styles.body}>
        {user?.profilePictureUrl && (
          <Avatar
            uri={user.profilePictureUrl}
            size={rem(36)}
            borderRadius={rem(16)}
          />
        )}
        <Animated.View style={[styles.greeting, fromAnimatedStyle]}>
          <GreetingText />
          {user && <Text style={styles.nickText}>{user.username}</Text>}
        </Animated.View>

        <Animated.View
          pointerEvents={'none'}
          style={[StyleSheet.absoluteFill, styles.balance, toAnimatedStyle]}>
          <Text style={styles.balanceText}>20,249,999.99</Text>
          <Text style={styles.currencyText}> ice</Text>
        </Animated.View>

        <MenuButton />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  body: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    flexDirection: 'row',
    alignItems: 'center',
    height: rem(70),
  },
  balance: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  balanceText: {
    ...font(17, 21, 'black', 'primaryDark'),
  },
  currencyText: {
    ...font(13, 21, 'semibold', 'primaryDark'),
  },
  greeting: {
    flex: 1,
    marginLeft: rem(14),
  },
  nickText: {
    marginTop: rem(2),
    ...font(15, 18, 'bold', 'downriver'),
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: rem(7),
  },
});
