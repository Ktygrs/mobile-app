// SPDX-License-Identifier: BUSL-1.1

import {SCREEN_SIDE_OFFSET, smallHeightDevice} from '@constants/styles';
import {Images} from '@images';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  title: string;
  description: string;
  Input: ReactNode;
  Button: ReactNode;
  Note?: ReactNode;
};

export function UpdateAccountField({
  title,
  description,
  Input,
  Button,
  Note,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={Images.phone.modifyPhoneNumber}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {Input}
      {Note}
      <View style={styles.button}>{Button}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: rem(10),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  image: {
    alignSelf: 'center',
    height: smallHeightDevice ? rem(80) : rem(140),
  },
  title: {
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(2),
    ...font(24, 29, 'black', 'primaryDark'),
  },
  description: {
    textAlign: 'center',
    marginHorizontal: rem(30),
    marginBottom: rem(24),
    ...font(14, 24, 'regular', 'secondary'),
  },
  button: {
    flexGrow: 1,
    marginTop: rem(25),
    marginHorizontal: rem(30),
    justifyContent: 'flex-end',
  },
});
