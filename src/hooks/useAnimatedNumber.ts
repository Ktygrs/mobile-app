// SPDX-License-Identifier: BUSL-1.1

import {useCallback, useEffect, useState} from 'react';
import {
  Easing,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export function useAnimatedNumber(
  value: number,
  formatter: (value: number) => string = v => `${v}`,
) {
  const [animatedValue, setAnimatedValue] = useState('0');

  const sharedValue = useSharedValue<number>(0);

  const updateValue = useCallback(
    (newValue: number) => {
      const newFormattedValue = formatter(newValue);
      if (newFormattedValue !== animatedValue) {
        setAnimatedValue(newFormattedValue);
      }
    },
    [animatedValue, formatter],
  );

  useDerivedValue(() => {
    runOnJS(updateValue)(sharedValue.value);
  });

  useEffect(() => {
    sharedValue.value = withTiming(value, {
      duration: 500,
      easing: Easing.quad,
    });
  }, [sharedValue, value]);

  return animatedValue;
}
