// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar/Avatar';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {HEADER_HEIGHT} from '@navigation/components/Header';
import {BackButton} from '@navigation/components/Header/components/BackButton';
import {SettingsButton} from '@navigation/components/Header/components/SettingsButton';
import {userSelector} from '@store/modules/Account/selectors';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {rem, screenWidth} from 'rn-units';

const AVATAR_SMALL_SIZE = rem(36);
const AVATAR_SIZE = rem(122);
const AVATAR_SMALL_RADIUS = rem(16);
const AVATAR_RADIUS = rem(41);

type Props = {
  uri?: string;
  scrollY: SharedValue<number>;
};

const MAX_SCROLL = 160;
const SCROLL_STEP_1 = 140;
export const AvatarHeader = memo(({uri, scrollY}: Props) => {
  const user = useSelector(userSelector);
  const {shadowStyle} = useScrollShadow({translateY: scrollY});
  const {top: topInset} = useSafeAreaInsets();

  const imageSize = useDerivedValue(() =>
    interpolate(
      scrollY.value,
      [0, MAX_SCROLL],
      [AVATAR_SIZE, AVATAR_SMALL_SIZE],
      Extrapolate.CLAMP,
    ),
  );

  const marginTop = useDerivedValue(() =>
    interpolate(
      scrollY.value,
      [0, MAX_SCROLL],
      [AVATAR_SIZE / 2 + HEADER_HEIGHT / 2 + 8, 0],
      Extrapolate.CLAMP,
    ),
  );

  const borderWidth = useDerivedValue(() =>
    interpolate(scrollY.value, [0, MAX_SCROLL], [5, 0], Extrapolate.CLAMP),
  );

  const borderRadius = useDerivedValue(() =>
    interpolate(
      scrollY.value,
      [0, MAX_SCROLL],
      [AVATAR_RADIUS, AVATAR_SMALL_RADIUS],
      Extrapolate.CLAMP,
    ),
  );

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: imageSize.value,
      width: imageSize.value,
      borderWidth: borderWidth.value,
      borderRadius: borderRadius.value,
      marginTop: marginTop.value,
    };
  });

  const textOpacity = useDerivedValue(() =>
    interpolate(scrollY.value, [130, SCROLL_STEP_1], [0, 1], Extrapolate.CLAMP),
  );

  const fontSize = useDerivedValue(() =>
    interpolate(
      scrollY.value,
      [0, SCROLL_STEP_1],
      [0.01, 17],
      Extrapolate.CLAMP,
    ),
  );

  const marginLeft = useDerivedValue(() =>
    interpolate(scrollY.value, [0, MAX_SCROLL], [0, 12], Extrapolate.CLAMP),
  );

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    fontSize: fontSize.value,
    marginLeft: marginLeft.value,
  }));

  const extraPadding = {paddingTop: topInset, height: HEADER_HEIGHT + topInset};

  return (
    <Animated.View style={[styles.container, extraPadding, shadowStyle]}>
      <BackButton
        containerStyle={styles.backButton}
        color={COLORS.primaryDark}
        allowOnTab
      />
      <View style={styles.wrapper}>
        <Animated.View style={[imageAnimatedStyle, styles.imageContainer]}>
          <Avatar
            uri={uri}
            style={styles.image}
            size={AVATAR_SIZE}
            borderRadius={AVATAR_RADIUS}
            touchableStyle={styles.touchableAvatar}
          />
        </Animated.View>
        <Animated.Text
          style={[styles.usernameText, textStyle]}
          numberOfLines={1}>
          {user?.username}
        </Animated.Text>
      </View>
      <View style={styles.rightContainer}>
        <SettingsButton />
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    width: screenWidth,
    overflow: 'visible',
    backgroundColor: COLORS.white,
    zIndex: 1000,
    marginTop: rem(4),
    ...commonStyles.shadow,
  },
  wrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: rem(20),
  },
  rightContainer: {
    paddingRight: rem(16),
    alignSelf: 'center',
  },
  imageContainer: {
    borderColor: COLORS.foam,
    overflow: 'hidden',
  },
  image: {
    width: undefined,
    height: undefined,
    borderRadius: 0,
    flex: 1,
  },
  usernameText: {
    ...font(17, 20.4, 'semibold', 'primaryDark'),
  },
  backButton: {
    justifyContent: 'center',
    paddingLeft: rem(16),
  },
  touchableAvatar: {
    flex: 1,
  },
});
