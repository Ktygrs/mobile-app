// SPDX-License-Identifier: BUSL-1.1

import {IceLabel} from '@components/Labels/IceLabel';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {ChevronSmallIcon} from '@svg/ChevronSmallIcon';
import {CompletedTrophyIcon} from '@svg/CompletedTrophyIcon';
import {TaskCompletedSvg} from '@svg/TaskCompleted';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  iceCount: number;
  onPress: () => void;
  isExpanded: boolean;
};

const DONE_ICON_SIZE = rem(16);
const COMPLETED_ICON_SIZE = rem(40);
const TROPHY_ICON_SIZE = rem(36);

export const CompletedItem = ({iceCount, onPress, isExpanded}: Props) => {
  return (
    <Touchable
      style={[styles.container, commonStyles.shadow]}
      onPress={onPress}>
      <View style={[styles.iconContainer]}>
        <View style={styles.trophyWrapper}>
          <CompletedTrophyIcon />
        </View>
        <View style={styles.completedWrapper}>
          <TaskCompletedSvg
            fill={COLORS.shamrock}
            width={DONE_ICON_SIZE}
            height={DONE_ICON_SIZE}
          />
        </View>
      </View>
      <View style={styles.textsWrapper}>
        <Text style={styles.title}>{t('tasks.completed.title')}</Text>
        <Text style={styles.description}>
          {t('tasks.completed.description', {count: iceCount})}
          <IceLabel color={COLORS.toreaBay} iconSize={14} />.
        </Text>
      </View>
      <View style={styles.chevronWrapper}>
        <ChevronSmallIcon
          color={COLORS.codeFieldText}
          width={rem(8)}
          height={rem(6)}
          style={isExpanded ? styles.rotatedChevron : {}}
        />
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    height: rem(60),
    flexDirection: 'row',
    marginLeft: SCREEN_SIDE_OFFSET,
    backgroundColor: 'white',
    paddingHorizontal: rem(12),
    borderRadius: rem(16),
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginVertical: rem(8),
    marginRight: rem(8),
    width: COMPLETED_ICON_SIZE,
    height: COMPLETED_ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophyWrapper: {
    width: TROPHY_ICON_SIZE,
    height: TROPHY_ICON_SIZE,
    backgroundColor: COLORS.primaryLight,
    borderRadius: rem(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedWrapper: {
    width: DONE_ICON_SIZE,
    height: DONE_ICON_SIZE,
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textsWrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    ...font(14, 17, 'black', 'primaryDark'),
  },
  description: {
    marginTop: rem(4),
    ...font(12, 14, 'medium', 'toreaBay'),
  },
  chevronWrapper: {
    width: rem(12),
    marginLeft: rem(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotatedChevron: {
    transform: [{rotateZ: '180deg'}],
  },
});
