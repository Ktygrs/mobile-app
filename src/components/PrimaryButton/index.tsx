// SPDX-License-Identifier: BUSL-1.1

import {Touchable, TouchableProps} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {rem} from 'rn-units';

interface PrimaryButtonProps extends TouchableProps {
  onPress: () => void;
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

export const PrimaryButton = ({
  onPress,
  text,
  style = {},
  textStyle = {},
  icon,
  loading = false,
  disabled = false,
  ...touchableProps
}: PrimaryButtonProps) => {
  return (
    <Touchable
      onPress={!loading ? onPress : undefined}
      style={[styles.button, disabled && styles.button_disabled, style]}
      {...touchableProps}
      disabled={disabled}>
      {style && !('backgroundColor' in style) && !disabled && (
        <LinearGradient
          colors={[
            COLORS.primaryButtonGradientStart,
            COLORS.primaryButtonGradientEnd,
          ]}
          style={StyleSheet.absoluteFill}
        />
      )}
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text style={[styles.text, textStyle]}>{text}</Text>
      {loading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          color={COLORS.white}
        />
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: rem(60),
    borderRadius: rem(20),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button_disabled: {
    backgroundColor: COLORS.secondary,
  },
  icon: {
    marginLeft: rem(10),
  },
  text: {
    marginHorizontal: rem(10),
    ...font(17, 20.4, 'semibold'),
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: rem(16),
  },
});
