// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

export type PopUpButtonProps = {
  label: string;
  Icon?: ReactNode;
  onPress?: () => void;
  preset?: 'default' | 'destructive' | 'outlined';
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export const DEFAULT_DIALOG_YES_BUTTON: PopUpButtonProps = {
  label: t('button.yes'),
};

export const DEFAULT_DIALOG_NO_BUTTON: PopUpButtonProps = {
  label: t('button.no_cancel'),
  preset: 'outlined',
};

export const PopUpButton = ({
  label,
  Icon,
  preset,
  onPress,
  containerStyle,
  labelStyle,
}: PopUpButtonProps) => {
  return (
    <Touchable
      key={label}
      style={[
        styles.button,
        preset === 'destructive' && styles.buttonDestructive,
        preset === 'outlined' && styles.buttonOutlined,
        containerStyle,
      ]}
      onPress={onPress}>
      {Icon}
      <Text
        style={[
          styles.labelText,
          !!Icon && styles.labelIconMargin,
          preset === 'destructive' && styles.labelTextDestructive,
          preset === 'outlined' && styles.labelTextOutlined,
          labelStyle,
        ]}>
        {label}
      </Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: rem(128),
    height: rem(40),
    borderRadius: rem(12),
    paddingHorizontal: rem(18),
    marginHorizontal: rem(8),
    marginVertical: rem(5),
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonOutlined: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  buttonDestructive: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.attentionDark,
  },
  labelText: {
    textAlign: 'center',
    ...font(14, 18, 'black'),
  },
  labelIconMargin: {
    marginLeft: rem(6),
  },
  labelTextOutlined: {
    color: COLORS.secondary,
  },
  labelTextDestructive: {
    color: COLORS.attentionDark,
  },
});
