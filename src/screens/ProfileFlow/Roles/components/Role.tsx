// SPDX-License-Identifier: BUSL-1.1

import {CheckMark} from '@components/CheckMark';
import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {isIOS, rem} from 'rn-units';

type Props = {
  title: string;
  tagline: string;
  description: string;
  imageSource: ImageSourcePropType;
  backgroundColor?: string;
  checked?: boolean;
};

export const Role = ({
  title,
  tagline,
  description,
  imageSource,
  checked = false,
}: Props) => {
  return (
    <View style={[styles.container, checked ? styles.selectedBox : styles.box]}>
      <Image source={imageSource} style={styles.icon} />
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.taglineText}>{tagline}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
      {checked && <CheckMark style={styles.checkmark} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: rem(17),
    paddingHorizontal: rem(24),
    marginBottom: rem(18),
    borderRadius: rem(20),
    marginTop: rem(30),
    backgroundColor: COLORS.white,
  },
  titleText: {
    marginTop: rem(6),
    ...font(20, null, 'bold', 'primaryDark'),
  },
  icon: {
    marginTop: -rem(30),
    width: rem(160),
    height: rem(160),
  },
  checkmark: {
    position: 'absolute',
    top: rem(12),
    right: rem(12),
  },
  taglineText: {
    marginTop: rem(8),
    textAlign: 'center',
    ...font(16, 20, 'medium', 'primaryDark'),
  },
  descriptionText: {
    marginTop: rem(14),
    textAlign: 'center',
    ...font(14, 20, 'medium', 'secondary'),
  },
  selectedBox: {
    backgroundColor: COLORS.aliceBlue,
  },
  box: isIOS
    ? {
        shadowColor: COLORS.linkWater,
        shadowRadius: 20,
        shadowOpacity: 1,
      }
    : {elevation: 4},
});
