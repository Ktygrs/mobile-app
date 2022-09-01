// SPDX-License-Identifier: BUSL-1.1

import {Images} from '@images';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {screenWidth} from 'rn-units';

export const LinesBackground = () => {
  return (
    <Image
      source={Images.backgrounds.linesBg}
      style={styles.background}
      resizeMode={'contain'}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: screenWidth,
    height: undefined,
    aspectRatio: 375 / 420,
  },
});
