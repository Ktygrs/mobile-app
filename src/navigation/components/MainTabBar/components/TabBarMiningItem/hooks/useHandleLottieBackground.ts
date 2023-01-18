// SPDX-License-Identifier: BUSL-1.1

import LottieView from 'lottie-react-native';
import {RefObject, useEffect} from 'react';
import {AppState} from 'react-native';

export const useHandleLottieBackground = (lottieRef: RefObject<LottieView>) => {
  /**
   * Lottie stops playing if the app goes background so we resume it manually
   */
  useEffect(() => {
    const listener = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        lottieRef.current?.play();
      }
    });
    return listener.remove;
  }, [lottieRef]);
};
