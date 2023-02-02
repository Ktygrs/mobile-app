// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {useHandleLottieBackground} from '@hooks/useHandleLottieBackground';
import {LottieAnimations} from '@lottie';
import {isAppInitializedSelector} from '@store/modules/AppCommon/selectors';
import LottieView from 'lottie-react-native';
import React, {useCallback, useRef, useState} from 'react';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {screenWidth} from 'rn-units';

export const AnimatedSplash = () => {
  const isAppInitialized = useSelector(isAppInitializedSelector);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const lottieRef = useRef<LottieView>(null);

  useHandleLottieBackground(lottieRef);

  useEffect(() => {
    if (isAppInitialized && animationFinished && isSplashVisible) {
      setIsSplashVisible(false);
    }
  }, [animationFinished, isAppInitialized, isSplashVisible]);

  const finishAnimation = useCallback((isCancelled: boolean) => {
    if (!isCancelled) {
      setAnimationFinished(true);
    }
  }, []);

  if (!isSplashVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LottieView
        ref={lottieRef}
        style={styles.animation}
        source={LottieAnimations.splashLogo}
        autoPlay
        loop={false}
        onAnimationFinish={finishAnimation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryLight,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: screenWidth,
    height: screenWidth * 2.165,
  },
});