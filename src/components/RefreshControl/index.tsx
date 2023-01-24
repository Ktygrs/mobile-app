// SPDX-License-Identifier: BUSL-1.1

import {ActivityIndicator} from '@components/ActivityIndicator';
import {COLORS} from '@constants/colors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useEffect, useState} from 'react';
import {
  Platform,
  RefreshControl as RefreshControlBase,
  RefreshControlProps,
  StyleSheet,
  Text,
} from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

type CustomRefreshControlProps = RefreshControlProps & {
  translateY: SharedValue<number>;
};

const RefreshControlIos = ({
  onRefresh,
  refreshing,
  progressViewOffset,
  translateY,
  ...props
}: CustomRefreshControlProps) => {
  const [showText, setShowText] = useState(true);

  const rotation = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(-translateY.value, [0, 24, 100], [0, 1, 1]),
      transform: [
        {
          translateY: interpolate(-translateY.value, [0, 100], [-16, 10]),
        },
      ],
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${-translateY.value}deg`,
        },
      ],
    };
  });

  useEffect(() => {
    if (refreshing) {
      rotation.value = withRepeat(
        withTiming(270, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1,
      );

      return () => {
        cancelAnimation(rotation);
        rotation.value = 0;
      };
    }
  }, [refreshing, rotation]);

  useEffect(() => {
    if (refreshing) {
      setShowText(false);
    } else {
      const timeoutId = setTimeout(() => {
        setShowText(true);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [refreshing]);

  return (
    <RefreshControlBase
      tintColor={'transparent'}
      colors={['transparent']}
      progressViewOffset={progressViewOffset}
      refreshing={refreshing}
      onRefresh={onRefresh}
      {...props}>
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
          <ActivityIndicator style={styles.iconContainer} />
        </Animated.View>

        <Text
          style={[styles.text, showText ? styles.visible : styles.invisible]}>
          {t('global.pull_to_refresh')}
        </Text>
      </Animated.View>
    </RefreshControlBase>
  );
};

const COLORS_ANDROID = [
  COLORS.primaryDark,
  COLORS.primary,
  COLORS.primaryLight,
];

export const RefreshControl = ({
  translateY,
  ...props
}: CustomRefreshControlProps) => {
  if (Platform.OS === 'ios') {
    return <RefreshControlIos translateY={translateY} {...props} />;
  }

  return <RefreshControlBase colors={COLORS_ANDROID} {...props} />;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconContainer: {
    width: rem(32),
    height: rem(32),
  },

  text: {
    marginTop: rem(1),
    ...font(10, undefined, 'regular', 'primaryLight'),
  },
  visible: {
    opacity: 1,
  },
  invisible: {
    opacity: 0,
  },
});
