// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {translate} from '@translations/i18n';
import {font} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';
interface NotNowButtonProps {
  onPress?: () => void;
  disabled: boolean;
}

export const NotNowButton = ({onPress, disabled}: NotNowButtonProps) => {
  return (
    <Touchable disabled={disabled} onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{translate('button.not_now_btn')}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rem(18),
    paddingVertical: rem(12),
  },
  text: {
    ...font(12, null, 'medium', 'primaryDark'),
  },
});
