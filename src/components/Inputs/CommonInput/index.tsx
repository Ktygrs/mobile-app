// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {ActivityIndicator, ViewStyle} from 'react-native';
import {isAndroid, rem} from 'rn-units';

interface CommonInputProps extends TextInputProps {
  icon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  errorText?: string;
  loading?: boolean;
}

export const CommonInput = ({
  icon,
  containerStyle,
  errorText,
  loading,
  ...props
}: CommonInputProps) => {
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        errorText ? styles.inputError : null,
      ]}>
      {icon || null}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor={COLORS.secondaryLight}
          {...props}
        />
        {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
        {loading && <ActivityIndicator style={styles.loader} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: rem(13),
    alignItems: 'center',
    borderRadius: rem(13),
    borderWidth: rem(1.5),
    borderColor: COLORS.secondaryLight,
    minHeight: rem(56),
  },
  input: {
    paddingLeft: rem(6),
    flex: 1,
    height: rem(36),
    ...font(16, 19, 'regular', 'primaryDark'),
  },
  inputError: {
    borderColor: COLORS.attention,
  },
  errorText: {
    position: 'absolute',
    bottom: 0,
    paddingLeft: rem(6),
    marginBottom: isAndroid ? rem(6) : 0,
    ...font(11, null, 'regular', 'attention'),
  },
  inputWrapper: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
});
