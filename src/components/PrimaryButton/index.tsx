// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import React, {ReactNode} from 'react';
import {
  ActivityIndicator,
  FlexStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {font, rem} from 'rn-units';

interface PrimaryButtonProps {
  onPress: () => void;
  text: string;
  style?: StyleProp<ViewStyle | FlexStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
  loading?: boolean;
}

export const PrimaryButton = ({
  onPress,
  text,
  style = {},
  textStyle = {},
  icon,
  loading = false,
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {icon ? icon : null}
      <Text style={[styles.text, textStyle]}>{text}</Text>
      {loading && <ActivityIndicator style={styles.activityIndicator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: rem(45),
    backgroundColor: COLORS.primary,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: FONTS.primary.black,
    color: COLORS.white,
    fontSize: font(14),
    lineHeight: rem(16.8),
    marginHorizontal: rem(10),
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: rem(10),
  },
});
