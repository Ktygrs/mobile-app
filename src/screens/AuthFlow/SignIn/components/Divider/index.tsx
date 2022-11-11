// SPDX-License-Identifier: BUSL-1.1

import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const DIVIDER_HEIGHT = rem(56);

export const Divider = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.orText}>{t('signIn.or')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DIVIDER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  orText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    ...font(10, 12, 'regular', 'secondary'),
  },
});
