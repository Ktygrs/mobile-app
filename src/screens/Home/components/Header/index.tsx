// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar/Avatar';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {userSelector} from '@store/modules/Auth/selectors';
import {BellSvg} from '@svg/Bell';
import {ChatBubblesSvg} from '@svg/ChatBubbles';
import {StatsSvg} from '@svg/Stats';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {font, rem} from 'rn-units';

export const HomeHeader = memo(() => {
  const user = useSelector(userSelector);
  const hours = new Date().getHours();
  const greeting =
    hours > 5 && hours < 12
      ? t('general.good_morning')
      : hours >= 12 && hours < 18
      ? t('general.good_afternoon')
      : t('general.good_evening');
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        {user?.profilePictureUrl && (
          <Avatar
            uri={user.profilePictureUrl}
            size={rem(32)}
            borderRadius={rem(12)}
            style={styles.avatarImage}
          />
        )}
        <View>
          <Text style={styles.greetings}>{greeting}</Text>
          {user && <Text style={styles.nick}>{`@${user.username}`}</Text>}
        </View>
      </View>

      <View style={styles.icons}>
        <TouchableOpacity style={styles.icon}>
          <BellSvg />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <StatsSvg />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <ChatBubblesSvg />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: rem(18),
  },
  avatarImage: {
    borderWidth: 1,
    marginRight: rem(8),
    borderColor: COLORS.white,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetings: {
    fontSize: font(13),
    color: COLORS.white,
    marginBottom: 2,
    fontFamily: FONTS.primary.regular,
    lineHeight: rem(16),
  },
  nick: {
    fontSize: font(13),
    color: COLORS.white,
    fontFamily: FONTS.primary.bold,
    lineHeight: rem(16),
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: rem(7),
  },
});
