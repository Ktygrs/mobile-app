// SPDX-License-Identifier: BUSL-1.1

import {stopPropagation} from '@components/KeyboardDismiss';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  total: number;
  active: number;
  title: string;
  earnings: string;
};

export const ListHeader = ({total, active, title, earnings}: Props) => {
  return (
    <View {...stopPropagation}>
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={styles.label}>{`${t('users.active')}: `}</Text>
          {`${active}/${total}`}
        </Text>
        <Text style={styles.title}>
          <Text style={styles.label}>{`${title}: `}</Text>
          {earnings}
          <IceLabel iconSize={16} color={COLORS.primaryDark} />
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    ...font(14, null, 'regular', 'secondary'),
  },
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
