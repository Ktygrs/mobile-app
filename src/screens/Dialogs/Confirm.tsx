// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {rem} from 'rn-units';

export type ConfirmButton = {
  label: string;
  onPress?: () => void;
  preset?: 'default' | 'destructive' | 'outlined';
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export const DEFAULT_CONFIRM_YES_BUTTON: ConfirmButton = {
  label: t('button.yes'),
};

export const DEFAULT_CONFIRM_NO_BUTTON: ConfirmButton = {
  label: t('button.no_cancel'),
  preset: 'outlined',
};

export const Confirm = () => {
  const {
    params: {
      title,
      subtitle,
      buttons = [DEFAULT_CONFIRM_YES_BUTTON, DEFAULT_CONFIRM_NO_BUTTON],
    },
  } = useRoute<RouteProp<MainStackParamList, 'Confirm'>>();
  const navigation = useNavigation();
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        {!!title && <Text style={styles.titleText}>{title}</Text>}
        {!!subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
        <View style={styles.buttons}>
          {buttons.map(button => (
            <Touchable
              key={button.label}
              style={[
                styles.button,
                button.preset === 'destructive' && styles.button_destructive,
                button.preset === 'outlined' && styles.button_outlined,
                button.containerStyle,
              ]}
              onPress={() => {
                navigation.goBack();
                button.onPress?.();
              }}>
              <Text
                style={[
                  styles.buttonLabelText,
                  button.preset === 'outlined' &&
                    styles.buttonLabelText_outlined,
                  button.labelStyle,
                ]}>
                {button.label}
              </Text>
            </Touchable>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.transparentBackground,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLORS.white,
    marginHorizontal: SCREEN_SIDE_OFFSET,
    paddingHorizontal: rem(28),
    paddingTop: rem(30),
    paddingBottom: rem(38),
    borderRadius: rem(20),
  },
  titleText: {
    textAlign: 'center',
    ...font(24, 29, 'black', 'primaryDark'),
  },
  subtitleText: {
    marginTop: rem(14),
    textAlign: 'center',
    ...font(14, 24, 'regular', 'secondary'),
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: rem(10),
    justifyContent: 'center',
  },
  button: {
    width: rem(96),
    height: rem(34),
    borderRadius: rem(11),
    marginHorizontal: rem(6),
    marginTop: rem(10),
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  button_outlined: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  button_destructive: {
    backgroundColor: COLORS.attention,
  },
  buttonLabelText: {
    textAlign: 'center',
    ...font(12, 15, 'black'),
  },
  buttonLabelText_outlined: {
    color: COLORS.secondary,
  },
});
