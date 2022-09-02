// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleSheet, Text} from 'react-native';

type Props = {
  icon: ReactNode;
  text: string;
  onPress: () => void;
  disabled?: boolean;
};

export const UserListItemButton = ({icon, text, onPress, disabled}: Props) => {
  return (
    <Touchable
      disabled={disabled}
      style={disabled ? styles.disabledButton : styles.button}
      onPress={onPress}>
      {icon}
      <Text style={disabled ? styles.disabledText : styles.buttonText}>
        {text}
      </Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.primaryDark,
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 2,
  },
  disabledButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.cadetBlue,
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 2,
  },
  buttonText: {
    paddingLeft: 3,
    textTransform: 'uppercase',
    ...font(12, null, 'bold', 'primaryDark'),
  },
  disabledText: {
    paddingLeft: 3,
    textTransform: 'uppercase',
    ...font(12, null, 'bold', 'cadetBlue'),
  },
});
