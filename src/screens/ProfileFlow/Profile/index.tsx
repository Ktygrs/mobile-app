// SPDX-License-Identifier: BUSL-1.1

import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {ProfileTabStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AvatarHeader} from '@screens/ProfileFlow/Profile/components/AvatarHeader';
import {Badges} from '@screens/ProfileFlow/Profile/components/Badges';
import {Invite} from '@screens/ProfileFlow/Profile/components/Invite';
import {LadderBar} from '@screens/ProfileFlow/Profile/components/LadderBar';
import {MiningCalculator} from '@screens/ProfileFlow/Profile/components/MiningCalculator';
import {Role} from '@screens/ProfileFlow/Profile/components/Role';
import {
  anotherUserSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {UsersActions} from '@store/modules/Users/actions';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {font} from '@utils/styles';
import React, {memo, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const Profile = memo(() => {
  useFocusStatusBar({style: 'dark-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<ProfileTabStackParamList, 'Profile'>>();
  const authUser = useSelector(userSelector);
  const isOwner = !route.params || route.params.userId === authUser?.id;
  const user = useSelector(isOwner ? userSelector : anotherUserSelector);

  useEffect(() => {
    if (!isOwner) {
      dispatch(UsersActions.GET_USER_BY_ID.START.create(route.params.userId));
    }
  }, [dispatch, isOwner, route.params]);

  const isLoading = useSelector(
    isLoadingSelector.bind(null, UsersActions.GET_USER_BY_ID),
  );

  return (
    <View style={styles.container}>
      <AvatarHeader
        scrollY={scrollY}
        uri={user?.profilePictureUrl}
        isSettingsHidden={!isOwner}
        isLoading={isLoading}
      />
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
          {isOwner && (
            <>
              <Invite />
              <MiningCalculator />
            </>
          )}
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
    paddingTop: rem(39),
    marginTop: -rem(23),
  },
  imageContainer: {
    marginTop: rem(20),
    overflow: 'hidden',
  },
  ladderContainer: {
    backgroundColor: COLORS.primaryLight,
    paddingBottom: rem(30),
  },
  usernameText: {
    marginTop: rem(70),
    marginBottom: rem(20),
    alignSelf: 'center',
    ...font(17, 20.4, 'semibold'),
  },
});
