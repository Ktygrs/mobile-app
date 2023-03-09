// SPDX-License-Identifier: BUSL-1.1

import {useAnimatedNumber} from '@hooks/useAnimatedNumber';
import React, {memo} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';

interface Props {
  style: StyleProp<TextStyle>;
  value: number;
}

export const IconValueText = memo(({style, value}: Props) => {
  const animatedValue = useAnimatedNumber(value);

  return <Text style={style}>{`+${animatedValue}%`}</Text>;
});
