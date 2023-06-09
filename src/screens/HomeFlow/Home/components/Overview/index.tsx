// SPDX-License-Identifier: BUSL-1.1

import {FlipCard, FlipCardMethods} from '@components/FlipCard';
import {InviteButton} from '@components/InviteButton';
import {SectionHeader} from '@components/SectionHeader';
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
import {t} from '@translations/i18n';
import React, {memo, useRef, useState} from 'react';
import {Image, LayoutChangeEvent, Platform, StyleSheet} from 'react-native';
import Animated, {SharedValue} from 'react-native-reanimated';
import {isAndroid, isIOS, rem, screenWidth} from 'rn-units';

const HEADER_RECTANGLE = require('../../assets/images/topRectangle.png');

type Props = {
  /**
   * onScroll -> contentOffset.y of the parent ScrollView
   */
  translateY: SharedValue<number>;

  /**
   * offset from the top of the parent ScrollView
   */
  topOffset: number;
};

const SCROLL_TOP_MARGIN = rem(16);
const SCROLL_BOTTOM_PADDING = rem(8);
const SCROLL_BOTTOM_MARGIN = rem(24);
const OVERSCROLL = isIOS ? 1000 : 0;

export const Overview = memo(({translateY, topOffset}: Props) => {
  const adoptionCardRef = useRef<FlipCardMethods>(null);

  const [positionYInnerContent, setPositionYInnerContent] = useState(0);

  const {cardTranslateY, stickyAnimatedStyle} = useCardTranslateY({
    translateY,
    cardsTopOffset: topOffset + positionYInnerContent + SCROLL_TOP_MARGIN,
  });

  const {shadowStyle} = useScrollShadow({translateY: cardTranslateY});

  const {collapseAnimatedStyle, isCollapsed} = useScrollCollapse({
    translateY: cardTranslateY,
    fromHeight: CARDS_TOTAL_HEIGHT + SCROLL_BOTTOM_PADDING,
    toHeight: CARDS_COLLAPSED_HEIGHT + SCROLL_BOTTOM_PADDING,
  });

  const handleAdoptionPress = () => {
    adoptionCardRef.current?.changeSide();
  };

  const onLayoutContentContainer = (event: LayoutChangeEvent) => {
    setPositionYInnerContent(event.nativeEvent.layout.y);
  };

  return (
    <>
      <Image style={styles.headerTopImage} source={HEADER_RECTANGLE} />

      <SectionHeader
        style={styles.sectionHeader}
        title={t('home.overview.title')}
      />

      <Animated.View
        style={[styles.bodySpace, stickyAnimatedStyle, isIOS && shadowStyle]}
        pointerEvents={'box-none'}
        onLayout={onLayoutContentContainer}>
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentInset={contentInset}
          style={[
            styles.scrollView,
            collapseAnimatedStyle,
            isAndroid && shadowStyle,
          ]}
          contentContainerStyle={styles.scrolledContent}>
          <LevelCard isCollapsed={isCollapsed} />

          <FlipCard
            disabled={isCollapsed}
            stylesContainer={styles.flipCardContainer}
            front={<ReferralsCard isCollapsed={isCollapsed} />}
            back={<ReferralAcquisitionHistory isCollapsed={isCollapsed} />}
          />

          <FlipCard
            disabled={isCollapsed}
            stylesContainer={styles.flipCardContainer}
            front={
              <AdoptionCard
                isCollapsed={isCollapsed}
                onPress={handleAdoptionPress}
              />
            }
            back={<OnlineUsersHistory />}
            ref={adoptionCardRef}
          />
        </Animated.ScrollView>
      </Animated.View>

      <InviteButton />
    </>
  );
});

/**
 * used to make semi transparent overscroll background on iOS
 */
const contentInset = {left: -OVERSCROLL, top: 0, bottom: 0, right: -OVERSCROLL};

const styles = StyleSheet.create({
  headerTopImage: {
    width: screenWidth,
    height: screenWidth * 0.08,
    backgroundColor: COLORS.primaryLight,
  },
  sectionHeader: {
    paddingTop: 0,
    height: -1,
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
