// SPDX-License-Identifier: BUSL-1.1

import {HomeActiveIcon} from '@svg/TabBar/HomeActiveIcon';
import {HomeInactiveIcon} from '@svg/TabBar/HomeInactiveIcon';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
};

export const HomeIcon = ({focused}: Props) => {
  return focused ? (
    <HomeActiveIcon style={styles.icon} width={rem(40)} height={rem(40)} />
  ) : (
    <HomeInactiveIcon style={styles.icon} width={rem(40)} height={rem(40)} />
  );
};

const styles = StyleSheet.create({
  icon: {marginLeft: rem(8)},
});
