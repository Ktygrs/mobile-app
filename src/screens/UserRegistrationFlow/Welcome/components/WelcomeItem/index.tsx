// SPDX-License-Identifier: BUSL-1.1

import {font} from '@utils/styles';
import * as React from 'react';
import {Image, ImageRequireSource, StyleSheet, Text, View} from 'react-native';
import {isAndroid, rem, screenHeight} from 'rn-units';

interface WelcomeItemProps {
  title: string | React.ReactNode;
  image: ImageRequireSource;
  description: string | React.ReactNode;
  index: string;
}

const DESIGN_SCREEN_HEIGHT = 812;
const ORIGINAL_IMAGE_HEIGHT = 380;
const ORIGINAL_IMAGE_WIDTH = 375;
const DESIGN_MARGIN_TOP = isAndroid ? 15 : 22;
const SMALL_SCREEEN = screenHeight < DESIGN_SCREEN_HEIGHT;
const IMAGE_HEIGHT = SMALL_SCREEEN
  ? (screenHeight / DESIGN_SCREEN_HEIGHT) * ORIGINAL_IMAGE_HEIGHT
  : ORIGINAL_IMAGE_HEIGHT;
const IMAGE_WIDTH = SMALL_SCREEEN
  ? (screenHeight / DESIGN_SCREEN_HEIGHT) * ORIGINAL_IMAGE_WIDTH
  : ORIGINAL_IMAGE_WIDTH;
const MARGIN_TOP = SMALL_SCREEEN
  ? (screenHeight / DESIGN_SCREEN_HEIGHT) * DESIGN_MARGIN_TOP
  : DESIGN_MARGIN_TOP;

export const WelcomeItem = ({title, image, description}: WelcomeItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode={'contain'} />
      </View>
      <View style={styles.description}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    marginTop: rem(MARGIN_TOP),
    paddingHorizontal: rem(30),
  },
  title: {
    textAlign: 'center',
    marginBottom: rem(MARGIN_TOP),
    ...font(28, 34, 'black', 'primaryDark'),
  },
  descriptionText: {
    textAlign: 'center',
    ...font(14, 24, 'regular', 'secondary'),
  },
  image: {width: IMAGE_WIDTH, height: IMAGE_HEIGHT},
});
