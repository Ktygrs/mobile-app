// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {ListControlBase} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlBase';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  label: string;
  value: string;
  action: string;
  onPress: () => void;
};

export const ListControlAction = memo(
  ({label, value, action, onPress}: Props) => {
    return (
      <Touchable onPress={onPress}>
        <ListControlBase label={label}>
          <Text style={styles.valueText}>{value}</Text>
          <Text style={styles.actionText}>{action}</Text>
        </ListControlBase>
      </Touchable>
    );
  },
);

const styles = StyleSheet.create({
  valueText: {
    flex: 1,
    ...font(14, null, 'bold', 'secondary'),
  },
  actionText: {
    marginHorizontal: rem(12),
    ...font(10, null, 'black', 'primaryDark'),
  },
});
