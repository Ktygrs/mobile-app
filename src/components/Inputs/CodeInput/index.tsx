// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {hapticFeedback} from '@utils/device';
import {font} from '@utils/styles';
import React, {useEffect} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {rem} from 'rn-units';

interface CodeInputProps extends TextInputProps {
  value: string;
  setValue: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  cellCount?: number;
  errorText?: string | null;
  validated?: boolean;
}

export const DEFAULT_CELL_COUNT = 6;

export const CodeInput = ({
  value,
  setValue,
  containerStyle,
  cellCount = DEFAULT_CELL_COUNT,
  errorText,
  validated,
  ...textInputProps
}: CodeInputProps) => {
  const ref = useBlurOnFulfill({value, cellCount});
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (errorText) {
      hapticFeedback();
    }
  }, [errorText]);

  return (
    <View style={containerStyle}>
      <CodeField
        ref={ref}
        value={value}
        onChangeText={setValue}
        cellCount={cellCount}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        {...codeFieldProps}
        {...textInputProps}
        renderCell={({index, symbol}: {index: number; symbol: string}) => {
          let borderStyle = styles.cell_empty;
          if (errorText) {
            borderStyle = styles.cell_error;
          } else if (validated) {
            borderStyle = styles.cell_success;
          } else if (symbol !== '') {
            borderStyle = styles.cell_filled;
          }
          return (
            <View style={[styles.cell, borderStyle]} key={index}>
              <Text
                style={styles.cellText}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol}
              </Text>
            </View>
          );
        }}
      />
      <View style={styles.error}>
        {!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    flex: 1,
  },
  cell: {
    borderWidth: 1.5,
    borderRadius: rem(13),
    width: rem(44),
    height: rem(52),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell_empty: {
    borderColor: COLORS.secondaryLight,
  },
  cell_filled: {
    borderColor: COLORS.primaryLight,
  },
  cell_error: {
    borderColor: COLORS.attention,
  },
  cell_success: {
    borderColor: COLORS.shamrock,
  },
  cellText: {
    ...font(17, 26, 'semibold', 'codeFieldText'),
  },
  error: {
    height: rem(26),
  },
  errorText: {
    marginHorizontal: rem(26),
    textAlign: 'center',
    ...font(13, 26, 'medium', 'attention'),
  },
});
