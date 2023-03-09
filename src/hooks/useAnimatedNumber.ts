// SPDX-License-Identifier: BUSL-1.1

import debounce from 'lodash/debounce';
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
  const sharedValue = useSharedValue<number>(0);

  const [animatedValue, setAnimatedValue] = useState('0');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setAnimatedValueDebounced = useCallback(
    debounce(
      (newValue: string) => {
        setAnimatedValue(newValue);
      },
      50,
      {
        maxWait: 50,
      },
    ),
    [],
  );

  const updateValue = useCallback(
    (newValue: number) => {
      const newFormattedValue = formatter(newValue);
      if (newFormattedValue !== animatedValue) {
        setAnimatedValueDebounced(newFormattedValue);
      }
    },
    [animatedValue, formatter, setAnimatedValueDebounced],
  );

  useDerivedValue(() => {
    runOnJS(updateValue)(sharedValue.value);
  });

  useEffect(() => {
    sharedValue.value = withTiming(value, {
      duration: 800,
      easing: Easing.quad,
    });
  }, [sharedValue, value]);

  return animatedValue;
}
