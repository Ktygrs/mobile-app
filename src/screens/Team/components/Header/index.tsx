// SPDX-License-Identifier: BUSL-1.1

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {
  InfoItem,
  InfoItemType,
} from '@screens/Team/components/Header/components/InfoItem';
import {Search} from '@screens/Team/components/Header/components/Search';
import {TeamActions} from '@store/modules/Team/actions';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import debounce from 'lodash/debounce';
import React, {memo, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  isSearchActive: boolean;
};

export const Header = memo(({isSearchActive}: Props) => {
  const dispatch = useDispatch();

  const search = debounce((query: string) => {
    dispatch(TeamActions.SEARCH_USERS.START.create({query, offset: 0}));
  }, 600);

  const loading = useSelector(
    isLoadingSelector.bind(null, TeamActions.SEARCH_USERS),
  );

  const searchShared = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    height: interpolate(searchShared.value, [0, 1], [90, 10]),
    opacity: interpolate(searchShared.value, [0, 1], [1, 0]),
  }));

  useEffect(() => {
    searchShared.value = withTiming(isSearchActive ? 1 : 0);
  }, [isSearchActive, searchShared]);

  const onFocus = () => {
    dispatch(TeamActions.SET_SEARCH.STATE.create(true));
  };

  const onClosePress = () => {
    dispatch(TeamActions.SET_SEARCH.STATE.create(false));
  };

  return (
    <View style={styles.container}>
      <Search
        searchShared={searchShared}
        loading={loading}
        onChangeText={search}
        onClosePress={onClosePress}
        onFocus={onFocus}
      />
      <Animated.View style={[styles.infoItems, animatedStyle]}>
        <InfoItem type={InfoItemType.referrals} />
        <InfoItem type={InfoItemType.earnings} />
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
  infoItems: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
