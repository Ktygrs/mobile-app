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
import {t} from '@translations/i18n';
import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const Tasks = memo(() => {
  const [isExpanded, setIsExpanded] = useState(false);
  const activeItem = taskItems.findIndex(v => v.active) + 1;
  const completedItems = taskItems.filter(v => v.completed);
  const areAllTasksCompleted = completedItems.length === taskItems.length;
  const activeLineHeight =
    areAllTasksCompleted && isExpanded
      ? ITEM_HEIGHT * completedItems.length + ITEM_HEIGHT / 2
      : ITEM_HEIGHT * activeItem + ITEM_HEIGHT / 2;

  const handleCompletedPress = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <SectionHeader title={t('home.tasks.title')} />
      <View style={styles.container}>
        <>
          <View style={styles.upcomingTasksLine} />
          <View
            style={[styles.finishedTasksLine, {height: activeLineHeight}]}
          />
          {!areAllTasksCompleted && (
            <ProgressItem
              completed={completedItems.length}
              total={taskItems.length}
            />
          )}
          {areAllTasksCompleted && (
            <CompletedItem
              iceCount={250}
              onPress={handleCompletedPress}
              isExpanded={isExpanded}
            />
          )}
          {(!areAllTasksCompleted || isExpanded) &&
            taskItems.map(task => <TaskItem key={task.type} task={task} />)}
        </>
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
});
