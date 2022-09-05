// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar/Avatar';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {LogoIcon} from '@svg/LogoIcon';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  username: string;
  profilePictureUrl: string;
  isIceFriend: boolean;
};

export const TeamMember = memo(
  ({username, profilePictureUrl, isIceFriend}: Props) => {
    return (
      <Touchable>
        <View>
          <Avatar
            uri={profilePictureUrl}
            size={rem(60)}
            borderRadius={rem(20)}
          />
          {isIceFriend && (
            <View style={styles.friendIcon}>
              <LogoIcon color={COLORS.white} width={rem(15)} height={rem(15)} />
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
    width: rem(22),
    height: rem(22),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(22 / 2),
    borderWidth: 1,
    borderColor: COLORS.white,
  },
});
