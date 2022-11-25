// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {CheckMarkThinIcon} from '@svg/CheckMarkThinIcon';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const CheckMark = ({style}: Props = {}) => {
  return (
    <View style={[styles.container, style]}>
      <CheckMarkThinIcon fill={COLORS.white} width={rem(14)} height={rem(14)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: rem(24),
    height: rem(24),
    borderRadius: rem(24) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.shamrock,
  },
});
