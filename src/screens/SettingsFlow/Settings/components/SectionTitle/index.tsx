// SPDX-License-Identifier: BUSL-1.1

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  text: string;
};

export const SectionTitle = ({text}: Props) => {
  return <Text style={styles.titleText}>{text}</Text>;
};

const styles = StyleSheet.create({
  titleText: {
    marginTop: rem(42),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    ...font(14, 17, 'bold', 'primaryDark'),
  },
});
