// SPDX-License-Identifier: BUSL-1.1

import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {AvatarHeader} from '@screens/ProfileFlow/Profile/components/AvatarHeader';
import {Badges} from '@screens/ProfileFlow/Profile/components/Badges';
import {Invite} from '@screens/ProfileFlow/Profile/components/Invite';
import {LadderBar} from '@screens/ProfileFlow/Profile/components/LadderBar';
import {MiningCalculator} from '@screens/ProfileFlow/Profile/components/MiningCalculator';
import {Role} from '@screens/ProfileFlow/Profile/components/Role';
import {userSelector} from '@store/modules/Auth/selectors';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const Profile = memo(() => {
  useFocusStatusBar({style: 'dark-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const user = useSelector(userSelector);

  return (
    <View style={styles.container}>
      <AvatarHeader scrollY={scrollY} uri={user?.profilePictureUrl} />
      <Animated.ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={[bottomOffset.current, styles.cardContainer]}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.imageContainer, commonStyles.baseSubScreen]}>
          <LinesBackground />
          <Text style={styles.usernameText} numberOfLines={1}>
            {user?.username}
          </Text>
        </View>
        <View style={styles.ladderContainer}>
          <LadderBar />
        </View>
        <View style={[styles.card, commonStyles.baseSubScreen]}>
          <Role />
          <Badges />
          <Invite />
          <MiningCalculator />
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
  cardContainer: {
    backgroundColor: COLORS.white,
  },
  card: {
    // make bottom overscroll area white, otherwise it'd be of container color
    paddingBottom: 2000,
    marginBottom: -2000,
    marginTop: -rem(23),
  },
  ladderContainer: {
    backgroundColor: COLORS.primaryLight,
    paddingBottom: rem(30),
  },
  imageContainer: {
    marginTop: rem(20),
    overflow: 'hidden',
  },
  usernameText: {
    marginTop: rem(70),
    marginBottom: rem(4),
    alignSelf: 'center',
    ...font(17, 20.4, 'semibold'),
  },
});
