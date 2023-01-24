// SPDX-License-Identifier: BUSL-1.1

import {LottieAnimations} from '@lottie';
import LottieView from 'lottie-react-native';
import React, {forwardRef} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const ActivityIndicator = forwardRef<LottieView, Props>(
  ({style}, ref) => (
    <LottieView
      ref={ref}
      style={[styles.animation, style]}
      source={LottieAnimations.loader}
      autoPlay
      loop
    />
  ),
);

const styles = StyleSheet.create({
  animation: {
    width: rem(32),
    height: rem(32),
  },
});
