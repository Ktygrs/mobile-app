// SPDX-License-Identifier: BUSL-1.1

import {TeamActiveIcon} from '@svg/TabBar/TeamActiveIcon';
import {TeamInactiveIcon} from '@svg/TabBar/TeamInactiveIcon';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
};

export const TeamIcon = ({focused}: Props) => {
  return focused ? (
    <TeamActiveIcon style={styles.icon} width={rem(40)} height={rem(40)} />
  ) : (
    <TeamInactiveIcon style={styles.icon} width={rem(40)} height={rem(40)} />
  );
};

const styles = StyleSheet.create({
  icon: {marginLeft: rem(26)},
});
