// SPDX-License-Identifier: BUSL-1.1

import {SectionHeader} from '@components/SectionHeader';
import {COLORS} from '@constants/colors';
import {CompletedItem} from '@screens/HomeFlow/Home/components/Tasks/components/CompletedItem';
import {ProgressItem} from '@screens/HomeFlow/Home/components/Tasks/components/ProgressItem';
import {
  ITEM_HEIGHT,
  ITEM_LEFT_POSITION,
  TaskItem,
} from '@screens/HomeFlow/Home/components/Tasks/components/TaskItem';
import {taskItems} from '@screens/HomeFlow/Home/components/Tasks/tasks';
import {ClockIcon} from '@svg/ClockIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {rem} from 'rn-units';

export const Tasks = memo(() => {
  const countCompletedItems = taskItems.filter(v => v.completed).length;

  const areAllTasksCompleted = countCompletedItems === taskItems.length;

  const [isExpanded, setIsExpanded] = useState(!areAllTasksCompleted);

  const [itemsContainerHeight, setItemsContainerHeight] = useState(0);

  const countCompletedItemsBeforeCurrentActive =
    areAllTasksCompleted && isExpanded
      ? countCompletedItems
      : taskItems.findIndex(v => v.active) + 1;

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
      <SectionHeader title={t('home.tasks.title')} />

      {
        // TODO: Hide until functionality is ready
        false ? (
          <View style={styles.container}>
            <View style={styles.upcomingTasksLine} />
            <View
              style={[
                styles.finishedTasksLine,
                {
                  height:
                    ITEM_HEIGHT *
                    (countCompletedItemsBeforeCurrentActive + 0.5),
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
                total={taskItems.length}
              />
            )}

            <Animated.View
              style={[
                styles.itemsContainer,
                !!itemsContainerHeight && itemsContainerStyle,
              ]}
              onLayout={onItemsContainerLayout}>
              {taskItems.map(task => (
                <TaskItem key={task.type} task={task} />
              ))}
            </Animated.View>
          </View>
        ) : (
          <View style={styles.comingSoonContainer}>
            <ClockIcon
              width={rem(20)}
              height={rem(20)}
              color={COLORS.secondary}
            />

            <Text style={styles.comingSoonText}>{t('global.comingSoon')}</Text>
          </View>
        )
      }
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
