// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {RightArrowSvg} from '@svg/RightArrow';
import {font} from '@utils/styles';
import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

type Props = {
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
  onNextPress: () => void;
};

export const CurrentRoleCard = ({
  title,
  description,
  imageSource,
  onNextPress,
}: Props) => {
  return (
    <Touchable onPress={onNextPress}>
      <View style={styles.container}>
        <Image source={imageSource} style={styles.icon} />
        <View style={styles.info}>
          <Text
            style={styles.titleText}
            numberOfLines={2}
            adjustsFontSizeToFit={true}>
            {title}
          </Text>
          <Text
            style={styles.descriptionText}
            numberOfLines={2}
            adjustsFontSizeToFit={true}>
            {description}
          </Text>
        </View>

        <RightArrowSvg style={styles.arrowNext} />
      </View>
    </Touchable>
  );
};

export const CurrentRoleSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={styles.container} />
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: rem(20),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    height: rem(69),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rem(4),
  },
  icon: {
    marginLeft: rem(10),
    height: rem(94),
    width: rem(94),
    marginBottom: rem(28),
  },
  info: {
    flex: 1,
    marginLeft: rem(10),
    justifyContent: 'center',
    marginTop: rem(4),
  },
  titleText: {
    ...font(20, 21, 'semibold'),
  },
  descriptionText: {
    marginTop: rem(3),
    ...font(12, 14.4, 'regular'),
  },
  arrowNext: {
    marginRight: rem(24),
  },
});
