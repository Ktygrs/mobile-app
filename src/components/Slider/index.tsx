// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  AwesomeSliderProps,
  Slider as AwesomeSlider,
} from 'react-native-awesome-slider';
import {isIOS, rem} from 'rn-units';

const noop = () => null;

const theme = {
  minimumTrackTintColor: COLORS.shamrock,
  maximumTrackTintColor: COLORS.secondaryFaint,
};

export const Slider = ({style, ...props}: AwesomeSliderProps) => (
  <AwesomeSlider
    theme={theme}
    thumbWidth={0}
    markWidth={0}
    containerStyle={styles.track}
    renderThumb={() => <View style={styles.thumb} />}
    markStyle={styles.mark}
    renderBubble={noop}
    style={[styles.container, style]}
    {...props}
  />
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: isIOS ? rem(10) : 0,
  },
  thumb: {
    backgroundColor: COLORS.shamrock,
    borderWidth: 2,
    borderColor: COLORS.white,
    width: rem(28),
    height: rem(28),
    marginLeft: -rem(28) / 2,
    borderRadius: rem(28) / 2,
  },
  track: {
    height: rem(6),
    borderRadius: rem(6) / 2,
    paddingRight: rem(16),
  },
  mark: {
    width: 0,
  },
});
