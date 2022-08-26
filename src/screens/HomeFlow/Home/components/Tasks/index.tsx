// SPDX-License-Identifier: BUSL-1.1

import {SectionHeader} from '@components/SectionHeader';
import {COLORS} from '@constants/colors';
import {ProgressItem} from '@screens/HomeFlow/Home/components/Tasks/components/ProgressItem';
import {
  ITEM_HEIGHT,
  ITEM_LEFT_POSITION,
  TaskItem,
} from '@screens/HomeFlow/Home/components/Tasks/components/TaskItem';
import {taskItems} from '@screens/HomeFlow/Home/components/Tasks/tasks';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const Tasks = memo(() => {
  const activeItem = taskItems.findIndex(v => v.active) + 1;
  const completedItems = taskItems.filter(v => v.completed);
  const activeLineHeight = ITEM_HEIGHT * activeItem + ITEM_HEIGHT / 2;

  return (
    <>
      <SectionHeader title={t('home.tasks.title')} />
      <View style={styles.container}>
        <View style={styles.upcomingTasksLine} />
        <View style={[styles.finishedTasksLine, {height: activeLineHeight}]} />
        <ProgressItem
          completed={completedItems.length}
          total={taskItems.length}
        />
        {taskItems.map(task => (
          <TaskItem key={task.type} task={task} />
        ))}
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
