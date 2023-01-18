// SPDX-License-Identifier: BUSL-1.1

import LottieView, {AnimatedLottieViewProps} from 'lottie-react-native';
import React, {forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  source: AnimatedLottieViewProps['source'];
};

export const MiningAnimation = forwardRef<LottieView, Props>(
  ({source}, forwardedRef) => (
    <LottieView
      style={styles.animation}
      source={source}
      autoPlay={true}
      loop={true}
      ref={forwardedRef}
    />
  ),
);

const styles = StyleSheet.create({
  animation: {
    width: rem(67),
    height: rem(67),
  },
});
