// SPDX-License-Identifier: BUSL-1.1

import {useHandleLottieBackground} from '@hooks/useHandleLottieBackground';
import LottieView, {AnimatedLottieViewProps} from 'lottie-react-native';
import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  source: AnimatedLottieViewProps['source'];
};

export const MiningAnimation = ({source}: Props) => {
  const lottieRef = useRef<LottieView>(null);

  useHandleLottieBackground(lottieRef);

  return (
    <LottieView
      style={styles.animation}
      source={source}
      autoPlay={true}
      loop={true}
      ref={lottieRef}
    />
  );
};

const styles = StyleSheet.create({
  animation: {
    width: rem(67),
    height: rem(67),
  },
});
