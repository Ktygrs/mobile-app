// SPDX-License-Identifier: BUSL-1.1

import {stopPropagination} from '@components/KeyboardDismiss';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  total: number;
  active: number;
  title: string;
};

export const ListHeader = ({total, active, title}: Props) => {
  return (
    <View {...stopPropagination}>
      <View style={styles.header}>
        <Text style={styles.title}>{`${t(
          'users.active',
        )}: ${active}/${total}`}</Text>
        <Text style={styles.title}>{`${t(title)}: 94,412 ice`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...font(14, null, 'regular', 'primaryDark'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rem(22),
  },
});
