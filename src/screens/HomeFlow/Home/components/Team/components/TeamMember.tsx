// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar/Avatar';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LogoIcon} from '@svg/LogoIcon';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  username: string;
  profilePictureUrl: string;
  isIceFriend: boolean;
  userId: string;
  phoneNumber?: string | null;
};

const DEFAULT_ICON_SIZE = rem(22);

export const TeamMember = memo(
  ({username, profilePictureUrl, isIceFriend, userId, phoneNumber}: Props) => {
    const navigation =
      useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    return (
      <Touchable
        onPress={() => navigation.navigate('UserProfile', {userId: userId})}>
        <View>
          <Avatar
            uri={profilePictureUrl}
            size={rem(60)}
            borderRadius={rem(20)}
            allowFullScreen={false}
          />
          {isIceFriend && (
            <View style={styles.friendIcon}>
              <LogoIcon color={COLORS.white} width={rem(15)} height={rem(15)} />
            </View>
          )}
          {phoneNumber && (
            <View style={styles.logoContainer}>
              <LogoIcon color={COLORS.white} />
            </View>
          )}
        </View>
        <Text style={styles.usernameText} numberOfLines={1}>
          {username}
        </Text>
      </Touchable>
    );
  },
);

const styles = StyleSheet.create({
  usernameText: {
    marginTop: rem(5),
    textAlign: 'center',
    width: rem(60),
    ...font(10, 12, 'medium', 'secondary'),
  },
  friendIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primaryLight,
    width: DEFAULT_ICON_SIZE,
    height: DEFAULT_ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(22 / 2),
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  logoContainer: {
    width: DEFAULT_ICON_SIZE,
    height: DEFAULT_ICON_SIZE,
    borderRadius: DEFAULT_ICON_SIZE / 2,
    position: 'absolute',
    backgroundColor: COLORS.primaryLight,
    right: 0,
    bottom: -rem(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.white,
  },
});
