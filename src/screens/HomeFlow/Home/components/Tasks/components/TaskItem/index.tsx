// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Task} from '@screens/HomeFlow/Home/components/Tasks/tasks';
import {LockIcon} from '@svg/LockIcon';
import {TaskCompletedSvg} from '@svg/TaskCompleted';
import {TaskNotCompletedSvg} from '@svg/TaskNotCompleted';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

const STEP_ICON_SIZE = rem(36);
const LOCK_ICON_SIZE = rem(17);
const ICON_VERTICAL_OFFSET = rem(11);
const ITEM_HORIZONTAL_MARGIN = rem(16);
const ITEM_HORIZONTAL_PADDING = SCREEN_SIDE_OFFSET;
const BULLET_POINT_ICON_SIZE = rem(20);

export const ITEM_LEFT_POSITION =
  ITEM_HORIZONTAL_MARGIN + ITEM_HORIZONTAL_PADDING + BULLET_POINT_ICON_SIZE / 2;
export const ITEM_HEIGHT = STEP_ICON_SIZE + ICON_VERTICAL_OFFSET * 2;

export const TaskItem = ({task}: {task: Task}) => {
  const isLocked = !task.completed && !task.active;
  return (
    <Touchable
      style={[
        styles.container,
        task.active ? [styles.containerActive, commonStyles.shadow] : null,
      ]}
      disabled={!task.active}>
      {task.completed ? (
        <TaskCompletedSvg
          fill={COLORS.shamrock}
          width={BULLET_POINT_ICON_SIZE}
          height={BULLET_POINT_ICON_SIZE}
        />
      ) : (
        <TaskNotCompletedSvg
          fill={isLocked ? COLORS.heather : COLORS.shamrock}
          stroke={isLocked ? COLORS.heather : COLORS.shamrock}
          width={BULLET_POINT_ICON_SIZE}
          height={BULLET_POINT_ICON_SIZE}
        />
      )}
      <View
        style={[styles.iconContainer, {backgroundColor: task.iconBackground}]}>
        {task.Icon}
        {isLocked && (
          <View style={styles.lockIcon}>
            <LockIcon />
          </View>
        )}
      </View>
      <View>
        <Text style={task.active ? styles.activeTitle : styles.title}>
          {task.title}
        </Text>
        <Text style={styles.description}>{task.description}</Text>
      </View>
      {isLocked ? (
        <View style={[StyleSheet.absoluteFill, styles.containerInactive]} />
      ) : null}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ITEM_HORIZONTAL_MARGIN,
    paddingHorizontal: ITEM_HORIZONTAL_PADDING,
    borderRadius: rem(16),
  },
  containerInactive: {
    opacity: 0.5,
    backgroundColor: COLORS.white,
  },
  containerActive: {
    backgroundColor: COLORS.white,
  },
  iconContainer: {
    width: STEP_ICON_SIZE,
    height: STEP_ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginLeft: rem(12),
    marginRight: rem(10),
    marginVertical: ICON_VERTICAL_OFFSET,
  },
  title: {
    ...font(12, 14, 'bold', 'downriver'),
  },
  activeTitle: {
    ...font(12, 14, 'bold', 'cornflowerBlue'),
  },
  description: {
    marginTop: rem(4),
    ...font(12, 14, 'medium', 'toreaBay'),
  },
  lockIcon: {
    position: 'absolute',
    width: LOCK_ICON_SIZE,
    height: LOCK_ICON_SIZE,
    bottom: -LOCK_ICON_SIZE / 3,
    right: -LOCK_ICON_SIZE / 3,
    borderRadius: LOCK_ICON_SIZE / 2,
    borderColor: COLORS.white,
    borderWidth: 1,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
