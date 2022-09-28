// SPDX-License-Identifier: BUSL-1.1

import {Badge} from '@components/Badge';
import {LampActiveIcon} from '@svg/LampActiveIcon';
import {LampInactiveIcon} from '@svg/LampInactiveIcon';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
};

export const NewsIcon = ({focused}: Props) => {
  return (
    <View style={styles.icon}>
      {focused ? (
        <LampActiveIcon width={rem(40)} height={rem(40)} />
      ) : (
        <LampInactiveIcon width={rem(40)} height={rem(40)} />
      )}
      <Badge value={3} style={styles.badge} />
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  icon: {marginRight: rem(26)},
});
