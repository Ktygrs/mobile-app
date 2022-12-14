// SPDX-License-Identifier: BUSL-1.1

import {FlipCard} from '@components/FlipCard';
import {InviteButton} from '@components/InviteButton';
import {SECTION_HEADER_HEIGH, SectionHeader} from '@components/SectionHeader';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {AdoptionCard} from '@screens/HomeFlow/Home/components/Overview/components/AdoptionCard';
import {
  CARD_WIDTH,
  CARDS_COLLAPSED_HEIGHT,
  CARDS_TOTAL_HEIGHT,
} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {LevelCard} from '@screens/HomeFlow/Home/components/Overview/components/LevelCard';
import {OnlineUsersHistory} from '@screens/HomeFlow/Home/components/Overview/components/OnlineUsersHistory';
import {ReferralAcquisitionHistory} from '@screens/HomeFlow/Home/components/Overview/components/ReferralAcquisitionHistory';
import {ReferralsCard} from '@screens/HomeFlow/Home/components/Overview/components/ReferralsCard';
import {useCardTranslateY} from '@screens/HomeFlow/Home/components/Overview/hooks/useCardTranslateY';
import {useScrollCollapse} from '@screens/HomeFlow/Home/components/Overview/hooks/useScrollCollapse';
import {useGetBarGraphDataForStatsPeriod} from '@store/modules/Stats/hooks/useGetBarGraphDataForStatsPeriod';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Animated, {SharedValue} from 'react-native-reanimated';
import {isAndroid, isIOS, rem} from 'rn-units';

type Props = {
  // onScroll -> contentOffset.y of the parent ScrollView
  translateY: SharedValue<number>;

  // offset from the top of the parent ScrollView
  topOffset: number;
};

const SCROLL_TOP_MARGIN = rem(16);
const SCROLL_BOTTOM_PADDING = rem(8);
const SCROLL_BOTTOM_MARGIN = rem(24);
const HEADER_TOP_MARGIN = rem(6);
const OVERSCROLL = isIOS ? 1000 : 0;

const USER_GROWTH_STATS_PERIOD = 7;

export const Overview = memo(({translateY, topOffset}: Props) => {
  const {cardTranslateY, stickyAnimatedStyle} = useCardTranslateY({
    translateY,
    cardsTopOffset:
      topOffset + SECTION_HEADER_HEIGH + HEADER_TOP_MARGIN + SCROLL_TOP_MARGIN,
  });
  const {shadowStyle} = useScrollShadow({translateY: cardTranslateY});
  const {collapseAnimatedStyle} = useScrollCollapse({
    translateY: cardTranslateY,
    fromHeight: CARDS_TOTAL_HEIGHT + SCROLL_BOTTOM_PADDING,
    toHeight: CARDS_COLLAPSED_HEIGHT + SCROLL_BOTTOM_PADDING,
  });

  const {activeUsersData} = useGetBarGraphDataForStatsPeriod(
    USER_GROWTH_STATS_PERIOD,
  );

  return (
    <>
      <SectionHeader
        title={t('home.overview.title')}
        style={styles.sectionHeader}
      />
      <Animated.View
        style={[styles.bodySpace, stickyAnimatedStyle, isIOS && shadowStyle]}
        pointerEvents={'box-none'}>
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentInset={contentInset}
          style={[
            styles.scrollView,
            collapseAnimatedStyle,
            isAndroid && shadowStyle,
          ]}>
          <View style={styles.scrolledContent}>
            <LevelCard />
            <FlipCard
              stylesContainer={styles.flipCardContainer}
              front={<ReferralsCard />}
              back={<ReferralAcquisitionHistory />}
            />
            <FlipCard
              stylesContainer={styles.flipCardContainer}
              front={<AdoptionCard />}
              back={<OnlineUsersHistory data={activeUsersData} />}
            />
          </View>
        </Animated.ScrollView>
      </Animated.View>
      <InviteButton />
    </>
  );
});

// used to make semi transparent overscroll background on iOS
const contentInset = {left: -OVERSCROLL, top: 0, bottom: 0, right: -OVERSCROLL};

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: HEADER_TOP_MARGIN,
  },
  bodySpace: {
    height: CARDS_TOTAL_HEIGHT + SCROLL_TOP_MARGIN + SCROLL_BOTTOM_MARGIN,
    zIndex: 1,
  },
  scrollView: {
    position: 'absolute',
    top: SCROLL_TOP_MARGIN,
    left: 0,
    right: 0,
    ...Platform.select({
      android: {backgroundColor: COLORS.white},
    }),
  },
  scrolledContent: {
    flexDirection: 'row',
    paddingLeft: SCREEN_SIDE_OFFSET + OVERSCROLL,
    paddingRight: OVERSCROLL,
    backgroundColor: COLORS.white,
    ...Platform.select({
      android: {marginBottom: SCROLL_BOTTOM_PADDING},
      ios: {paddingBottom: SCROLL_BOTTOM_PADDING},
    }),
  },
  flipCardContainer: {
    width: CARD_WIDTH,
    marginRight: rem(16),
    borderRadius: rem(20),
    overflow: 'hidden',
    flexGrow: 1,
  },
});
