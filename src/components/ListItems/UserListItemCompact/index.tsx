// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar/Avatar';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
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
          {profilePictureUrl && (
            <Avatar
              uri={profilePictureUrl}
              size={rem(40)}
              borderRadius={rem(9)}
            />
          )}
        </View>
        <Text style={styles.nameText} numberOfLines={1}>
          {name}
        </Text>
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
  nameText: {
    flex: 1,
    ...font(15, 20, 'medium', 'primaryDark'),
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
