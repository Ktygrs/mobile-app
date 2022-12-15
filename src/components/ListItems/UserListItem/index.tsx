// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {Avatar} from '@components/Avatar/Avatar';
import {stopPropagation} from '@components/KeyboardDismiss';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getCountryByCode} from '@utils/country';
import {font} from '@utils/styles';
import React, {memo, ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

export const FLAG_MARGIN_LEFT = rem(12);
export const FLAG_FONT_SIZE = 26;

export const UserListItem = memo(
  ({
    user,
    AdditionalInfoComponent,
  }: {
    user: User;
    AdditionalInfoComponent?: ReactNode;
  }) => {
    const countryFlag = getCountryByCode(user.country).current?.flag;

    const navigation =
      useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    return (
      <View style={styles.container} {...stopPropagation}>
        <Touchable
          style={styles.touchArea}
          onPress={() => navigation.navigate('UserProfile', {userId: user.id})}>
          <View style={styles.imageContainer}>
            {user.profilePictureUrl && (
              <Avatar
                uri={user.profilePictureUrl}
                size={rem(46)}
                borderRadius={rem(16)}
                allowFullScreen={false}
              />
            )}
            <View
              style={[
                styles.indicator,
                {
                  backgroundColor: user.active
                    ? COLORS.shamrock
                    : COLORS.cadetBlue,
                },
              ]}
            />
          </View>
          <View style={styles.body}>
            <Text style={styles.nameText} numberOfLines={1}>
              {user.username}
            </Text>
            {user.phoneNumber ? (
              <Text style={styles.noteText}>{user.phoneNumber}</Text>
            ) : null}
          </View>
        </Touchable>
        {AdditionalInfoComponent}
        <Text style={styles.flag}>{countryFlag}</Text>
      </View>
    );
  },
);

export const UserListItemSkeleton = ({
  containerStyle,
}: {containerStyle?: StyleProp<ViewStyle>} = {}) => (
  <SkeletonPlaceholder>
    <View style={containerStyle}>
      <View style={styles.skeleton} />
    </View>
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
    marginRight: rem(5),
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
  flag: {
    ...font(FLAG_FONT_SIZE, null, undefined, undefined),
    marginLeft: FLAG_MARGIN_LEFT,
  },
  touchArea: {
    flex: 1,
    flexDirection: 'row',
  },
});
