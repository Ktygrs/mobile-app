// SPDX-License-Identifier: BUSL-1.1

import {IceLabel} from '@components/Labels/IceLabel';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {Divider} from '@screens/HomeFlow/Home/components/Overview/components/AdoptionCard/components/Divider';
import {Level} from '@screens/HomeFlow/Home/components/Overview/components/AdoptionCard/mockData';
import {CARD_WIDTH} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {CheckMarkThinIcon} from '@svg/CheckMarkThinIcon';
import {LockIcon} from '@svg/LockIcon';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View, ViewToken} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {isAndroid, rem} from 'rn-units';

export const LEVEL_ROW_HEIGHT = rem(49);
export const DIVIDER_HEIGHT = rem(7);
export const STEP_WIDTH = rem(52);

export const LevelRow = React.memo(
  ({
    item,
    viewableItems,
    isTopSeparatorVisible,
    isBottomSeparatorVisible,
    onPress,
  }: {
    item: Level;
    viewableItems: Animated.SharedValue<ViewToken[]>;
    isTopSeparatorVisible: boolean;
    isBottomSeparatorVisible: boolean;
    onPress: () => void;
  }) => {
    const locked = !item.active || item.completed;
    const animationStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value.find(
          viewableItem => viewableItem.item.id === item.id,
        )?.isViewable,
      );

      return {
        opacity: withTiming(isVisible ? 1 : 0.2),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.9),
          },
        ],
      };
    }, []);

    return (
      <Animated.View style={[styles.row, animationStyle]}>
        <View
          style={[
            styles.progressDivider,
            isTopSeparatorVisible ? styles.divider : {},
            locked ? styles.semitransparent : null,
          ]}
        />
        <Touchable style={styles.rowContent} onPress={onPress}>
          <View style={[styles.flank, locked ? styles.semitransparent : null]}>
            <View style={styles.leftTextContainer}>
              <Text style={styles.valueText}>{`${item.icePerHour}/h`}</Text>
              <View style={styles.leftIconContainer}>
                <IceLabel
                  iconOffsetY={isAndroid ? 4 : 2}
                  textStyle={styles.valueCurrencyText}
                  iconSize={rem(12)}
                />
              </View>
            </View>
            <Divider />
          </View>
          <View>
            <View style={[styles.step, locked ? styles.semitransparent : null]}>
              <Text style={styles.stepValueText}>{item.id}</Text>
              <Text style={styles.stepLabelText}>
                {t('home.adoption.level')}
              </Text>
            </View>
            {!item.active && !item.completed && (
              <View style={[styles.iconContainer, styles.locked]}>
                <LockIcon height={rem(9)} width={rem(7)} />
              </View>
            )}
            {item.completed && (
              <View style={[styles.iconContainer, styles.completed]}>
                <CheckMarkThinIcon width={rem(7)} height={rem(7)} />
              </View>
            )}
          </View>
          <View style={[styles.flank, locked ? styles.semitransparent : null]}>
            <Divider />
            <Text style={styles.valueText}>
              {`${formatNumber(item.usersCount, false)}`}
              <Text style={styles.valueCurrencyText}>
                {t('home.adoption.users')}
              </Text>
            </Text>
          </View>
        </Touchable>
        <View
          style={[
            styles.progressDivider,
            isBottomSeparatorVisible ? styles.divider : {},
            item.active || item.completed ? styles.semitransparent : null,
          ]}
        />
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  row: {
    height: LEVEL_ROW_HEIGHT,
    width: CARD_WIDTH,
    paddingHorizontal: rem(24),
  },
  rowContent: {
    flexDirection: 'row',
  },
  progressDivider: {
    width: 1,
    height: DIVIDER_HEIGHT,
    alignSelf: 'center',
  },
  divider: {
    backgroundColor: COLORS.white,
  },
  semitransparent: {
    opacity: 0.5,
  },
  flank: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    textAlign: 'center',
    minWidth: rem(36),
    ...font(15, 18, 'medium'),
  },
  valueCurrencyText: {
    opacity: 0.8,
    ...font(13, 16, 'regular'),
    marginLeft: -rem(2),
  },
  step: {
    width: STEP_WIDTH,
    height: LEVEL_ROW_HEIGHT - DIVIDER_HEIGHT,
    backgroundColor: COLORS.white,
    borderRadius: rem(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepValueText: {
    ...font(15, 18, 'black', 'deepKoamaru'),
  },
  stepLabelText: {
    opacity: 0.8,
    ...font(13, 16, 'regular', 'deepKoamaru'),
  },
  iconContainer: {
    position: 'absolute',
    top: 4,
    right: 3,
    width: rem(14),
    height: rem(14),
    borderRadius: rem(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  locked: {
    backgroundColor: COLORS.spindle,
  },
  completed: {
    backgroundColor: COLORS.completed,
  },
  leftTextContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    minWidth: rem(36),
  },
  leftIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
