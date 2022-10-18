// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {LogoIcon} from '@svg/LogoIcon';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleProp, Text, TextStyle, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  color?: string;
  iconSize?: number;
  lineHeight?: number;
  iconOffsetY?: number;
  label?: string;
};

export const IceLabel = memo(
  ({
    style,
    textStyle,
    color = COLORS.white,
    iconSize = 18,
    iconOffsetY = 2,
    label = t('general.ice'),
  }: Props) => (
    <>
      <LogoIcon
        color={color}
        width={rem(iconSize)}
        height={rem(iconSize)}
        style={[{transform: [{translateY: iconOffsetY}]}, style]}
      />
      <Text style={textStyle}> {label}</Text>
    </>
  ),
);
