// SPDX-License-Identifier: BUSL-1.1

import {useLabelAnimation} from '@components/Inputs/CommonInput/hooks/useLabelAnimation';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {CheckMarkThinIcon} from '@svg/CheckMarkThinIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {isAndroid, rem} from 'rn-units';

type Props = TextInputProps & {
  label: string;
  value: string;
  errorText?: string | null;
  validated?: boolean;
  loading?: boolean;
  icon?: Element;
  onValueChange?: (v: string) => void;
  onChange?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export const CommonInput: React.FC<Props> = ({
  label,
  errorText,
  validated,
  loading,
  icon,
  onChange,
  onBlur,
  onFocus,
  value,
  onChangeText,
  containerStyle,
  ...textInputProps
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const {animatedStyle} = useLabelAnimation(isFocused, value);

  return (
    <TouchableWithoutFeedback
      onPress={() => (onChange ? onChange() : inputRef?.current?.focus())}>
      <View
        style={[
          styles.container,
          isFocused && styles.container_focused,
          !!errorText && styles.container_error,
          containerStyle,
        ]}>
        {icon}
        <View style={styles.body}>
          <TextInput
            value={value}
            style={styles.input}
            ref={inputRef}
            autoCorrect={false}
            autoComplete={'off'}
            autoCapitalize={'none'}
            spellCheck={false}
            // disables autocomplete on Android, source: https://github.com/facebook/react-native/issues/18457
            keyboardType={isAndroid ? 'visible-password' : 'default'}
            onBlur={event => {
              setIsFocused(false);
              onBlur?.(event);
            }}
            onFocus={event => {
              setIsFocused(true);
              onFocus?.(event);
            }}
            onChangeText={newValue => {
              onChangeText?.(newValue);
            }}
            {...textInputProps}
          />

          <Animated.Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={[
              styles.label,
              errorText ? styles.label_error : null,
              animatedStyle,
            ]}>
            {errorText || label}
          </Animated.Text>
        </View>
        {onChange && (
          <Touchable style={styles.edit} onPress={onChange}>
            <Text style={styles.editText}>
              {t('button.change').toUpperCase()}
            </Text>
          </Touchable>
        )}
        {loading && <ActivityIndicator />}
        {(!!errorText || validated) && !loading && (
          <View
            style={[
              styles.result,
              errorText ? styles.result_error : styles.result_validated,
            ]}>
            {errorText ? (
              <Text style={styles.resultErrorIcon}>!</Text>
            ) : (
              <CheckMarkThinIcon width={rem(10)} height={rem(10)} />
            )}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const RESULT_ICON_SIZE = rem(20);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rem(20),
    height: rem(56),
    borderWidth: 1,
    borderRadius: rem(16),
    backgroundColor: COLORS.wildSand,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.wildSand,
  },
  container_error: {
    borderColor: COLORS.attention,
  },
  container_focused: {
    borderColor: COLORS.congressBlue,
  },
  body: {
    flex: 1,
    marginLeft: rem(10),
  },
  input: {
    ...font(16, 19, 'medium', 'primaryDark'),
    flex: 1,
    marginTop: rem(20),
    paddingHorizontal: 0,
  },
  label: {
    position: 'absolute',
    left: 0,
    right: 0,
    ...font(16, 20, 'medium', 'secondary'),
  },
  label_error: {
    color: COLORS.attention,
  },
  edit: {
    justifyContent: 'center',
  },
  editText: {
    ...font(12, 20, 'heavy', 'primaryDark'),
  },
  result: {
    width: RESULT_ICON_SIZE,
    height: RESULT_ICON_SIZE,
    borderRadius: RESULT_ICON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultErrorIcon: {
    ...font(14, 20, 'black'),
  },
  result_error: {
    backgroundColor: COLORS.attention,
  },
  result_validated: {
    backgroundColor: COLORS.shamrock,
  },
});
