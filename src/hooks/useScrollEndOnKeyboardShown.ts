// SPDX-License-Identifier: BUSL-1.1

import useIsKeyboardShown from '@hooks/useIsKeyboardShown';
import {useEffect, useRef} from 'react';
import {ScrollView} from 'react-native';
import Animated from 'react-native-reanimated';

export const useScrollEndOnKeyboardShown = () => {
  const scrollRef = useRef<Animated.ScrollView & ScrollView>(null);
  const isKeyboardShown = useIsKeyboardShown();

  useEffect(() => {
    if (isKeyboardShown) {
      scrollRef.current?.scrollToEnd();
    }
  }, [isKeyboardShown]);

  return {scrollRef};
};
