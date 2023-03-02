// SPDX-License-Identifier: BUSL-1.1

import {useEffect, useState} from 'react';
import {
  Easing,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export function useAnimatedNumber(value: number) {
  const [animatedValue, setAnimatedValue] = useState(0);

  const sharedValue = useSharedValue<number>(0);

  useDerivedValue(() => {
    runOnJS(setAnimatedValue)(sharedValue.value);
  });

  useEffect(() => {
    sharedValue.value = withTiming(value, {
      duration: 500,
      easing: Easing.quad,
    });
  }, [sharedValue, value]);

  return animatedValue;
}
