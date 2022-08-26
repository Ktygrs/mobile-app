// SPDX-License-Identifier: BUSL-1.1

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {CheckMark} from '@screens/ProfileFlow/MyRoles/components/CheckMark';
import {font} from '@utils/styles';
import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

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
  backgroundColor,
  checked = false,
}: Props) => {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={styles.titleText}>{title}</Text>
      <View>
        <Image source={imageSource} style={styles.icon} />
        {checked && <CheckMark style={styles.checkmark} />}
      </View>
      <Text style={styles.taglineText}>{tagline}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: rem(22),
    paddingHorizontal: SCREEN_SIDE_OFFSET + rem(30),
  },
  titleText: {
    marginTop: rem(20),
    ...font(20, null, 'bold', 'primaryDark'),
  },
  icon: {
    marginTop: rem(12),
    width: rem(130),
    height: rem(130),
  },
  checkmark: {
    position: 'absolute',
    bottom: rem(5),
    right: rem(10),
  },
  taglineText: {
    marginTop: rem(8),
    textAlign: 'center',
    ...font(18, 20, 'bold', 'primaryDark'),
  },
  descriptionText: {
    marginTop: rem(14),
    textAlign: 'center',
    ...font(14, 20, 'regular', 'secondary'),
  },
});
