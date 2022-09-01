// SPDX-License-Identifier: BUSL-1.1

import {InviteButton} from '@components/InviteButton';
import {
  SegmentedControl,
  SegmentedControlMethods,
} from '@components/SegmentedControl';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {FaqButton} from '@navigation/components/Header/components/FaqButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {ProfileTabStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {BadgeList} from '@screens/ProfileFlow/MyBadges/components/BadgeList';
import {BADGES, CATEGORIES} from '@screens/ProfileFlow/MyBadges/mockData';
import {t} from '@translations/i18n';
import React, {useCallback, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {rem} from 'rn-units';

export const MyBadges = () => {
  useFocusStatusBar({style: 'dark-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const route = useRoute<RouteProp<ProfileTabStackParamList, 'MyBadges'>>();
  const initialCategory = route.params?.category ?? 'social';
  const initialIndex = CATEGORIES.findIndex(c => c.key === initialCategory);

  const {scrollHandler, shadowStyle} = useScrollShadow();
  const switcherRef = useRef<SegmentedControlMethods>(null);
  const pagerRef = useRef<PagerView>(null);

  const onCategoryChange = useCallback((index: number) => {
    pagerRef.current?.setPage(index);
  }, []);

  const onPageChange = (event: PagerViewOnPageSelectedEvent) => {
    switcherRef.current?.changeSegment(event.nativeEvent.position);
  };

  return (
    <View style={styles.container} hitSlop={{left: -50}}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.primaryDark}
        backgroundColor={COLORS.white}
        renderRightButtons={FaqButton}
        title={t('my_badges.title')}
      />
      <SegmentedControl
        segments={CATEGORIES}
        ref={switcherRef}
        style={styles.categorySwitcher}
        onChange={onCategoryChange}
        initialIndex={initialIndex}
      />
      <PagerView
        initialPage={initialIndex}
        style={styles.container}
        ref={pagerRef}
        onPageSelected={onPageChange}>
        {CATEGORIES.map((category, index) => (
          <View key={index + 1} style={styles.container}>
            <BadgeList
              data={BADGES[category.key]}
              onScroll={scrollHandler}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={bottomOffset.current}
              ListFooterComponent={
                <View style={styles.inviteButton}>
                  <InviteButton />
                </View>
              }
            />
          </View>
        ))}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categorySwitcher: {
    marginVertical: rem(17),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  inviteButton: {
    marginTop: rem(18),
  },
});
