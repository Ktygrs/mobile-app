// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar/Avatar';
import {stopPropagination} from '@components/KeyboardDismiss';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {font} from '@utils/styles';
import React, {memo, ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

export const UserListItem = memo(
  ({
    name,
    note,
    profilePictureUrl,
    active,
    AdditionalInfoComponent,
    userId,
  }: {
    userId: string;
    name?: string | null | ReactNode;
    note?: string | null | ReactNode;
    profilePictureUrl?: string | null;
    active?: boolean;
    AdditionalInfoComponent?: ReactNode;
  }) => {
    const navigation =
      useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();
    return (
      <View style={styles.container} {...stopPropagination}>
        <Touchable
          style={styles.touchArea}
          onPress={() => navigation.navigate('Profile', {userId: userId})}>
          <View style={styles.imageContainer}>
            {profilePictureUrl && (
              <Avatar
                uri={profilePictureUrl}
                size={rem(46)}
                borderRadius={rem(16)}
                allowFullScreen={false}
              />
            )}
            <View
              style={[
                styles.indicator,
                {
                  backgroundColor: active ? COLORS.shamrock : COLORS.cadetBlue,
                },
              ]}
            />
          </View>
          <View style={styles.body}>
            <Text style={styles.nameText} numberOfLines={1}>
              {name}
            </Text>
            {note && <Text style={styles.noteText}>{note}</Text>}
          </View>
          {AdditionalInfoComponent}
        </Touchable>
      </View>
    );
  },
);

export const UserListItemSkeleton = ({
  containerStyle,
}: {containerStyle?: StyleProp<ViewStyle>} = {}) => (
  <SkeletonPlaceholder>
    <View style={[styles.skeleton, containerStyle]} />
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: rem(14),
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  imageContainer: {
    width: rem(46),
    height: rem(46),
    marginRight: rem(14),
  },
  indicator: {
    width: rem(15),
    height: rem(15),
    borderRadius: rem(7.5),
    borderWidth: 2,
    borderColor: COLORS.white,
    position: 'absolute',
    right: -2,
    bottom: -2,
  },
  nameText: {
    paddingBottom: rem(3),
    ...font(16, null, 'bold', 'primaryDark'),
  },
  noteText: {
    ...font(13.5, null, 'medium', 'emperor'),
  },
  skeleton: {
    height: rem(46),
    borderRadius: rem(16),
    marginTop: rem(14),
    alignSelf: 'stretch',
  },
  touchArea: {
    flex: 1,
    flexDirection: 'row',
  },
});
