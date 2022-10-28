// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {NextArrowSvg} from '@svg/NextArrow';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  text?: string;
};

export const NextButton = ({style, onPress, text}: Props) => {
  return (
    <Touchable style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{text || t('button.next_step')}</Text>
      <NextArrowSvg style={{marginLeft: rem(12)}} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: rem(12),
    paddingHorizontal: rem(32),
  },
  text: {
    ...font(17, 20.4, 'bold'),
  },
});
