// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar/Avatar';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {ClosedEye} from '@svg/ClosedEye';
import {font} from '@utils/styles';
import React, {memo, ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {isAndroid, rem} from 'rn-units';

export const UserListItemCompact = memo(
  ({
    name,
    profilePictureUrl,
    iceAmount,
    AdditionalInfoComponent,
  }: {
    name?: string | null | ReactNode;
    profilePictureUrl?: string | null;
    iceAmount?: string;
    AdditionalInfoComponent?: ReactNode;
  }) => {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {profilePictureUrl ? (
            <Avatar
              uri={profilePictureUrl}
              size={rem(40)}
              borderRadius={rem(9)}
            />
          ) : (
            <View style={styles.hiddenImage}>
              <ClosedEye color={COLORS.primaryLight} />
            </View>
          )}
        </View>
        {name ? (
          <Text style={styles.nameText} numberOfLines={1}>
            {name}
          </Text>
        ) : (
          <View style={styles.hiddenNameContainer}>
            <View style={styles.hiddenName}>
              <ClosedEye color={COLORS.primaryLight} />
            </View>
          </View>
        )}
        {iceAmount ? (
          <Text style={styles.iceText}>
            {iceAmount}{' '}
            <IceLabel
              iconOffsetY={isAndroid ? 2 : -1}
              iconSize={12}
              color={COLORS.secondary}
            />
          </Text>
        ) : (
          AdditionalInfoComponent
        )}
      </View>
    );
  },
);

export const UserListItemCompactSkeleton = ({
  containerStyle,
}: {containerStyle?: StyleProp<ViewStyle>} = {}) => (
  <SkeletonPlaceholder>
    <View style={[styles.skeleton, containerStyle]} />
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rem(16),
  },
  imageContainer: {
    width: rem(40),
    height: rem(40),
    marginRight: rem(12),
  },
  hiddenImage: {
    backgroundColor: COLORS.secondaryFaint,
    flex: 1,
    borderRadius: rem(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    flex: 1,
    ...font(15, 20, 'medium', 'primaryDark'),
  },
  hiddenNameContainer: {
    flex: 1,
  },
  hiddenName: {
    width: rem(76),
    height: rem(24),
    borderRadius: rem(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryFaint,
  },
  iceText: {
    ...font(12, 20, 'semibold', 'secondary'),
  },
  skeleton: {
    height: rem(40),
    borderRadius: rem(9),
    marginTop: rem(16),
    alignSelf: 'stretch',
  },
});
