// SPDX-License-Identifier: BUSL-1.1

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {rem} from 'rn-units';

export const AppVersion = memo(() => {
  const version = DeviceInfo.getReadableVersion();
  return <Text style={styles.titleText}>Version {version}</Text>;
});

const styles = StyleSheet.create({
  titleText: {
    marginTop: rem(42),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    ...font(14, 17, 'black', 'primaryDark'),
  },
});
