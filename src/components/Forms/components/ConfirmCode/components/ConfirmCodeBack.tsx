// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

type Props = {
  onPress: () => void;
  text: string;
};

export const ConfirmCodeBack = ({onPress, text}: Props) => (
  <Touchable onPress={onPress} hitSlop={MIDDLE_BUTTON_HIT_SLOP}>
    <Text style={styles.buttonText}>{text}</Text>
  </Touchable>
);

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    ...font(15, 18, 'medium', 'secondary'),
  },
});
