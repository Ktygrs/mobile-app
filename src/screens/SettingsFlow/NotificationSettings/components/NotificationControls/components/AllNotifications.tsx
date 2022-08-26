// SPDX-License-Identifier: BUSL-1.1

import {Switch} from '@components/Switch';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export const AllNotifications = memo(({label, value, onValueChange}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText} numberOfLines={2}>
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        style={styles.switch}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(42),
  },
  labelText: {
    flex: 1,
    ...font(12, null, 'bold', 'primaryDark'),
  },
  switch: {
    marginRight: rem(28),
  },
});
