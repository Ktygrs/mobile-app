// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {BackButton} from '@navigation/components/Header/components/BackButton';
import React, {memo, ReactNode, useMemo} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {font, rem} from 'rn-units';

type Props = {
  color?: string;
  backgroundColor?: string;
  title?: string;
  backLabel?: string;
  titleOffset?: number;
  renderRightButtons?: () => ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  titlePreset?: 'small' | 'big';
};

export const HEADER_HEIGHT = rem(54);

/**
 * Using absolute positioned View to make "elevation" display properly
 * And add static View with the same height to add offset for the rest of content
 */
export const Header = memo(
  ({
    title,
    backLabel,
    renderRightButtons,
    color = COLORS.primaryDark,
    backgroundColor = COLORS.primaryLight,
    titleOffset = rem(20),
    containerStyle,
    titlePreset = 'big',
  }: Props) => {
    const {top: topInset} = useSafeAreaInsets();
    const dynamicStyle = useMemo(
      () =>
        StyleSheet.create({
          titleText: {
            color,
            marginHorizontal: titleOffset,
          },
          container: {
            paddingTop: topInset,
            backgroundColor,
          },
          offset: {height: HEADER_HEIGHT + topInset},
        }),
      [color, titleOffset, topInset, backgroundColor],
    );

    return (
      <>
        <View style={dynamicStyle.offset} />
        <Animated.View
          style={[dynamicStyle.container, styles.container, containerStyle]}>
          <View style={[styles.body]}>
            <Text
              style={[
                styles.titleText,
                styles[`titleText_${titlePreset}`],
                dynamicStyle.titleText,
              ]}
              numberOfLines={2}>
              {title}
            </Text>
            <BackButton
              containerStyle={styles.backButton}
              color={color}
              label={backLabel}
            />
            {Boolean(renderRightButtons) && (
              <View style={styles.rightButtons}>{renderRightButtons?.()}</View>
            )}
          </View>
        </Animated.View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    height: HEADER_HEIGHT,
  },
  titleText: {
    flex: 1,
    textAlign: 'center',
  },
  titleText_big: {
    fontFamily: FONTS.primary.black,
    fontSize: font(22),
  },
  titleText_small: {
    fontFamily: FONTS.primary.bold,
    fontSize: font(18),
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  rightButtons: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
