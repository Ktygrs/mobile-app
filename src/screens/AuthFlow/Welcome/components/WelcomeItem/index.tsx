// SPDX-License-Identifier: BUSL-1.1

import {smallHeightDevice} from '@constants/styles';
import {font} from '@utils/styles';
import * as React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {rem, screenWidth} from 'rn-units';

type Props = {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  image: ImageSourcePropType;
};

export const WelcomeItem = ({title, image, description}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      <Image source={image} style={styles.image} resizeMode={'cover'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    flex: 1,
    marginHorizontal: rem(24),
  },
  titleText: {
    marginTop: smallHeightDevice ? rem(24) : rem(42),
    ...font(28, 34, 'black', 'white'),
  },
  descriptionText: {
    marginTop: smallHeightDevice ? rem(4) : rem(20),
    ...font(14, 24, 'medium', 'white'),
  },
  image: {
    width: screenWidth,
    height: (screenWidth * 330) / 375,
  },
});
