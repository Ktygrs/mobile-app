// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {
  ActivityIndicator,
  FlexStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {rem} from 'rn-units';

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
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text style={[styles.text, textStyle]}>{text}</Text>
      {loading && <ActivityIndicator style={styles.activityIndicator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: rem(45),
    backgroundColor: COLORS.primary,
    borderRadius: rem(12),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginLeft: rem(10),
  },
  text: {
    marginHorizontal: rem(10),
    ...font(14, 16.8, 'black'),
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: rem(10),
  },
});
