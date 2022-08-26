// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar/Avatar';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Level} from '@screens/ProfileFlow/Profile/components/UserInfo/components/Level';
import {userSelector} from '@store/modules/Auth/selectors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const UserInfo = memo(() => {
  const user = useSelector(userSelector);
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Avatar
          uri={user?.profilePictureUrl}
          size={rem(112)}
          borderRadius={rem(34)}
          style={styles.avatarImage}
        />
        {user && (
          <Text style={styles.usernameText} numberOfLines={1}>
            {`@${user.username}`}
          </Text>
        )}
      </View>
      <View style={styles.ladder}>
        <View style={styles.ladderLeft}>
          <Text style={styles.ladderValueText}>606,683</Text>
          <Text style={styles.ladderLabelText}>
            {t('profile.global_rank').toUpperCase()}
          </Text>
        </View>
        <Level value={21} />
        <View style={styles.ladderRight}>
          <View>
            <Text style={styles.ladderValueText}>1,024</Text>
            <Text style={styles.ladderLabelText}>
              {t('global.referrals').toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(20),
  },
  body: {
    alignItems: 'center',
  },
  usernameText: {
    marginTop: rem(20),
    ...font(18, 20, 'bold'),
  },
  ladder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rem(20),
  },
  ladderLeft: {
    flex: 1,
  },
  ladderRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  ladderValueText: {
    ...font(15, 18, 'black'),
  },
  ladderLabelText: {
    marginTop: rem(4),
    ...font(10, 12, 'bold'),
  },
  avatarImage: {
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
