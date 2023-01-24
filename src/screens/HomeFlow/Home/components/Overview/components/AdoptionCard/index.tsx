// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {
  LEVEL_ROW_HEIGHT,
  LevelRow,
  STEP_WIDTH,
} from '@screens/HomeFlow/Home/components/Overview/components/AdoptionCard/components/LevelRow';
import {levelItems} from '@screens/HomeFlow/Home/components/Overview/components/AdoptionCard/mockData';
import {
  CARD_WIDTH,
  CARDS_COLLAPSED_HEIGHT,
  CARDS_TOTAL_HEIGHT,
} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {FriendsIcon} from '@svg/FriendsIcon';
import {GraphIcon} from '@svg/GraphIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  Image,
  InteractionManager,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
  ViewabilityConfigCallbackPair,
  ViewabilityConfigCallbackPairs,
  ViewToken,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

const GRADIENT_START = {x: 0, y: 0.6};
const GRADIENT_END = {x: 0, y: 1};
const GRADIENT_COLORS = [
  COLORS.adoptionGradient,
  COLORS.adoptionGradient07,
  COLORS.adoptionGradient001,
];

type AdoptionCardProps = {
  isCollapsed: boolean;
  onPress: () => void;
};

const VERTICAL_ITEM_PADDING = CARDS_TOTAL_HEIGHT / 2 - LEVEL_ROW_HEIGHT / 2;

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 10,
};

export const AdoptionCard = ({isCollapsed, onPress}: AdoptionCardProps) => {
  const refFlatList = useRef<Animated.FlatList<typeof levelItems[0]>>(null);

  const sharedItems = useSharedValue<ViewToken[]>([]);

  const onViewableItemsChanged: NonNullable<
    ViewabilityConfigCallbackPair['onViewableItemsChanged']
  > = useCallback(
    ({viewableItems}) => {
      sharedItems.value = viewableItems;
    },
    [sharedItems],
  );

  const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>(
    [
      {
        viewabilityConfig,
        onViewableItemsChanged,
      },
    ],
  );

  const activeIndex = useMemo(() => {
    return levelItems.findIndex(({active}) => active);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    //@ts-ignore Bad types of Animated.FlatList, getNode() does not work
    refFlatList.current?.scrollToIndex({
      animated: true,
      index,
      viewPosition: 0.5,
    });
  }, []);

  const onScrollToIndexFailed = useCallback(
    ({
      highestMeasuredFrameIndex,
    }: {
      index: number;
      highestMeasuredFrameIndex: number;
      averageItemLength: number;
    }) => {
      scrollToIndex(highestMeasuredFrameIndex);

      setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
          scrollToIndex(activeIndex);
        });
      }, 200);
    },
    [activeIndex, scrollToIndex],
  );

  useEffect(() => {
    if (activeIndex >= 0) {
      scrollToIndex(activeIndex);
    }
  }, [activeIndex, scrollToIndex]);

  const animatedStyleFlatList = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isCollapsed ? 0 : 1, {
        duration: 200,
      }),
    };
  }, [isCollapsed]);

  const renderItem: ListRenderItem<typeof levelItems[0]> = useCallback(
    ({item, index}) => {
      return (
        <LevelRow
          item={item}
          viewableItems={sharedItems}
          isTopSeparatorVisible={index !== 0}
          isBottomSeparatorVisible={index !== levelItems.length - 1}
          onPress={isCollapsed ? onPress : undefined}
        />
      );
    },
    [sharedItems, isCollapsed, onPress],
  );

  return (
    <View style={styles.cardContainer}>
      <Image
        source={Images.backgrounds.adoptionCardBg}
        resizeMode={'cover'}
        style={styles.backgroundImage}
      />
      <View style={[styles.scrollAbsoluteContainer, styles.card]}>
        <Animated.FlatList
          ref={refFlatList}
          style={[styles.scrollContainer, animatedStyleFlatList]}
          contentContainerStyle={styles.scrollContentContainerStyle}
          data={levelItems}
          renderItem={renderItem}
          keyExtractor={({id}) => id}
          snapToInterval={VERTICAL_ITEM_PADDING + rem(3.5)}
          snapToAlignment={'center'}
          showsVerticalScrollIndicator={false}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          onScrollToIndexFailed={onScrollToIndexFailed}
        />
      </View>
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={[styles.gradient, styles.leftGradient]}
        pointerEvents={'none'}
      />
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={[styles.gradient, styles.rightGradient]}
        pointerEvents={'none'}
      />
      <View style={styles.header} pointerEvents={'none'}>
        <View style={styles.title}>
          <GraphIcon fill={COLORS.white} />
          <Text style={styles.titleText}>{t('home.adoption.title')}</Text>
        </View>
        <FriendsIcon fill={COLORS.white} />
        <Text style={styles.valueText}>{'28,450'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: CARD_WIDTH,
    height: CARDS_TOTAL_HEIGHT,
  },
  scrollContentContainerStyle: {
    width: CARD_WIDTH,
    paddingTop: VERTICAL_ITEM_PADDING - rem(7),
    paddingBottom: rem(16),
  },
  gradient: {
    width: CARD_WIDTH / 2 - STEP_WIDTH / 2,
    height: rem(40),
    position: 'absolute',
    top: 0,
  },
  leftGradient: {
    left: 0,
  },
  rightGradient: {
    right: 0,
  },
  scrollAbsoluteContainer: {
    position: 'absolute',
  },
  card: {
    width: CARD_WIDTH,
    height: CARDS_TOTAL_HEIGHT,
    overflow: 'hidden',
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: rem(16),
    borderRadius: rem(20),
    paddingHorizontal: rem(15),
    overflow: 'hidden',
    flexGrow: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARDS_TOTAL_HEIGHT,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: CARDS_COLLAPSED_HEIGHT,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleText: {
    textTransform: 'uppercase',
    marginLeft: rem(4),
    ...font(12, 15, 'black'),
  },
  valueText: {
    textTransform: 'uppercase',
    marginLeft: rem(4),
    ...font(12, 15, 'black'),
  },
});
