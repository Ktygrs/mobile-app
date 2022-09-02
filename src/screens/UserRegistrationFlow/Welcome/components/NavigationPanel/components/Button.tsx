// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import {rem} from 'rn-units';
interface ButtonProps {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
}

export const Button = ({
  onPress,
  text,
  rightIcon,
  leftIcon,
  style,
  textStyle,
  disabled,
}: ButtonProps) => {
  return (
    <Touchable
      style={[styles.container, style, disabled ? styles.disabled : null]}
      onPress={onPress}
      disabled={disabled}>
      {leftIcon || null}
      <Text
        style={[styles.text, textStyle, disabled ? styles.disabledText : null]}>
        {text}
      </Text>
      {rightIcon || null}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: rem(96),
    height: rem(41),
    backgroundColor: COLORS.primary,
    borderRadius: rem(11),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingHorizontal: rem(4),
    ...font(14, 17, 'black'),
  },
  disabled: {
    backgroundColor: COLORS.secondaryLight,
  },
  disabledText: {
    color: COLORS.white,
  },
});
