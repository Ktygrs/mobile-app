// SPDX-License-Identifier: BUSL-1.1

import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  text: string | ReactNode;
};

export const Banner = ({text}: Props) => {
  return <Text style={styles.bannerText}>{text}</Text>;
};

const styles = StyleSheet.create({
  bannerText: {
    marginTop: rem(10),
    ...font(32, 38.4, 'black', 'primaryLight'),
  },
});
