// SPDX-License-Identifier: BUSL-1.1

import {BadgeCategory} from '@api/badges/types';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

type Props = {
  title: string;
  category: BadgeCategory;
  progressText: string;
  progressValue: number;
  imageSource: ImageSourcePropType;
};

export const BadgeCard = memo(
  ({imageSource, title, category, progressText, progressValue}: Props) => {
    const navigation =
      useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('MyBadges', {category})}>
        <View style={[styles.container, commonStyles.shadow]}>
          <Text
            style={styles.titleText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}>
            {title}
          </Text>
          <Image
            source={imageSource}
            style={styles.icon}
            resizeMode={'contain'}
          />
          <View style={styles.progressHeader}>
            <Text
              style={styles.categoryText}
              numberOfLines={1}
              adjustsFontSizeToFit={true}>
              {category}
            </Text>
            <Text style={styles.progressText}>{progressText}</Text>
          </View>
          <View style={styles.progressBody}>
            <View
              style={[styles.progressValue, {width: `${progressValue}%`}]}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

export const BadgeCardSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={styles.container} />
  </SkeletonPlaceholder>
);

export const CARD_OFFSET = rem(8);

const styles = StyleSheet.create({
  container: {
    width: rem(120),
    height: rem(174),
    backgroundColor: COLORS.white,
    borderRadius: rem(8),
    marginHorizontal: CARD_OFFSET,
    marginVertical: CARD_OFFSET,
    alignItems: 'center',
  },
  titleText: {
    marginTop: rem(16),
    marginHorizontal: rem(6),
    ...font(14, 17, 'bold', 'primaryDark'),
  },
  progressHeader: {
    flexDirection: 'row',
    marginHorizontal: rem(12),
  },
  icon: {
    marginHorizontal: rem(10),
    marginVertical: rem(10),
    flex: 1,
  },
  categoryText: {
    flex: 1,
    ...font(12, 14, 'regular', 'primaryDark'),
  },
  progressText: {
    ...font(12, 14, 'regular', 'periwinkleGray'),
  },
  progressBody: {
    height: rem(8),
    borderRadius: rem(4),
    backgroundColor: COLORS.secondaryFaint,
    marginHorizontal: rem(12),
    alignSelf: 'stretch',
    marginTop: rem(4),
    marginBottom: rem(10),
  },
  progressValue: {
    height: rem(8),
    borderRadius: rem(4),
    backgroundColor: COLORS.shamrock,
  },
});
