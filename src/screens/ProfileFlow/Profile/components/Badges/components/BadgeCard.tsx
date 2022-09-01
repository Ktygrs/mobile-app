// SPDX-License-Identifier: BUSL-1.1

import {BadgeCategory} from '@api/badges/types';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ClosedEye} from '@svg/ClosedEye';
import {translate} from '@translations/i18n';
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
  active: boolean;
};

export const BadgeCard = memo(
  ({
    imageSource,
    title,
    category,
    progressText,
    progressValue,
    active,
  }: Props) => {
    const navigation =
      useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('MyBadges', {category})}>
        <View style={[styles.container, commonStyles.shadow]}>
          <Image
            source={imageSource}
            style={styles.icon}
            resizeMode={'contain'}
          />
          {active ? (
            <>
              <Text
                style={styles.titleText}
                numberOfLines={1}
                adjustsFontSizeToFit={true}>
                {title}
              </Text>
              <View style={styles.progressBody}>
                <View
                  style={[styles.progressValue, {width: `${progressValue}%`}]}
                />
              </View>
              <View style={styles.progressHeader}>
                <Text
                  style={styles.categoryText}
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}>
                  {category}
                </Text>
                <Text style={styles.progressText}>{progressText}</Text>
              </View>
            </>
          ) : (
            <>
              <ClosedEye height={20} width={20} color={COLORS.secondary} />
              <Text style={styles.hiddenText} numberOfLines={1}>
                {translate('profile.data_is_hidden')}
              </Text>
            </>
          )}
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

export const CARD_OFFSET = rem(7);

const styles = StyleSheet.create({
  container: {
    width: rem(135),
    height: rem(146),
    backgroundColor: COLORS.white,
    borderRadius: rem(14),
    marginHorizontal: CARD_OFFSET,
    marginVertical: CARD_OFFSET,
    alignItems: 'center',
    marginTop: rem(25),
  },
  titleText: {
    marginHorizontal: rem(6),
    ...font(14, 17, 'bold', 'primaryDark'),
  },
  progressHeader: {
    flexDirection: 'row',
    marginHorizontal: rem(10),
    marginBottom: rem(8),
  },
  icon: {
    height: rem(92),
    width: rem(135),
    marginTop: -rem(25),
    marginBottom: rem(15),
  },
  categoryText: {
    flex: 1,
    ...font(12, 14, 'regular', 'primaryDark'),
  },
  progressText: {
    ...font(12, 14, 'regular', 'periwinkleGray'),
  },
  progressBody: {
    height: rem(9),
    borderRadius: rem(4),
    backgroundColor: COLORS.secondaryFaint,
    marginHorizontal: rem(10),
    alignSelf: 'stretch',
    marginTop: rem(13),
    marginBottom: rem(9),
  },
  progressValue: {
    height: rem(9),
    borderRadius: rem(4),
    backgroundColor: COLORS.shamrock,
  },
  hiddenText: {
    marginTop: rem(7),
    ...font(14, 17, 'bold', 'secondary'),
  },
});
