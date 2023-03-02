// SPDX-License-Identifier: BUSL-1.1

import {SectionHeader} from '@components/SectionHeader';
import {COLORS} from '@constants/colors';
import {
  AchievementItem,
  ITEM_HEIGHT,
  ITEM_LEFT_POSITION,
} from '@screens/HomeFlow/Home/components/Achievements/components/AchievementItem';
import {CompletedItem} from '@screens/HomeFlow/Home/components/Achievements/components/CompletedItem';
import {ProgressItem} from '@screens/HomeFlow/Home/components/Achievements/components/ProgressItem';
import {useAchievements} from '@screens/HomeFlow/Home/components/Achievements/hooks/useAchievements';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo, useEffect, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {rem} from 'rn-units';

export const Achievements = memo(() => {
  const {achievements} = useAchievements();

  const currentActiveAchievementIndex = achievements.findIndex(
    achievement => !achievement.completed,
  );

  const countCompletedItems = achievements.filter(v => v.completed).length;

  const areAllTasksCompleted =
    achievements.length > 0 && countCompletedItems === achievements.length;

  const [isExpanded, setIsExpanded] = useState(!areAllTasksCompleted);

  useEffect(() => {
    if (!areAllTasksCompleted) {
      setIsExpanded(true);
    }
  }, [areAllTasksCompleted]);

  const [itemsContainerHeight, setItemsContainerHeight] = useState(0);

  const countCompletedItemsBeforeCurrentActive =
    areAllTasksCompleted && isExpanded
      ? countCompletedItems
      : achievements.findIndex(achievement => !achievement.completed) + 1;

  const itemsContainerStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(isExpanded ? itemsContainerHeight : 0, {
        duration: 500,
      }),
    };
  }, [itemsContainerHeight, isExpanded]);

  const onItemsContainerLayout = (event: LayoutChangeEvent) => {
    setItemsContainerHeight(
      Math.max(itemsContainerHeight, event.nativeEvent.layout.height),
    );
  };

  const handleCompletedPress = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <SectionHeader title={t('home.achievements.title')} />

      <View style={styles.container}>
        <View style={styles.upcomingTasksLine} />
        <View
          style={[
            styles.finishedTasksLine,
            {
              height:
                ITEM_HEIGHT * (countCompletedItemsBeforeCurrentActive + 0.5),
            },
          ]}
        />

        {areAllTasksCompleted ? (
          <CompletedItem
            onPress={handleCompletedPress}
            isExpanded={isExpanded}
          />
        ) : (
          <ProgressItem
            completed={countCompletedItems}
            total={achievements.length}
          />
        )}

        <Animated.View
          style={[
            styles.itemsContainer,
            !!itemsContainerHeight && itemsContainerStyle,
          ]}
          onLayout={onItemsContainerLayout}>
          {achievements.map((achievement, index) => (
            <AchievementItem
              key={achievement.type}
              achievement={achievement}
              active={index === currentActiveAchievementIndex}
            />
          ))}
        </Animated.View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(11),
  },
  finishedTasksLine: {
    position: 'absolute',
    top: 0,
    left: ITEM_LEFT_POSITION,
    width: 1,
    backgroundColor: COLORS.shamrock,
  },
  upcomingTasksLine: {
    position: 'absolute',
    top: 0,
    left: ITEM_LEFT_POSITION,
    bottom: ITEM_HEIGHT / 2,
    width: 1,
    backgroundColor: COLORS.heather,
  },

  itemsContainer: {
    overflow: 'hidden',
  },

  comingSoonContainer: {
    marginTop: rem(16),
    padding: rem(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonText: {
    marginTop: rem(11),
    ...font(15, 18, 'medium', 'secondary'),
  },
});
