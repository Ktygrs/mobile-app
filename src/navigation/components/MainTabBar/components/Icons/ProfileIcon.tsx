// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar/Avatar';
import {COLORS} from '@constants/colors';
import {userSelector} from '@store/modules/Auth/selectors';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
};

export const ProfileIcon = ({focused}: Props) => {
  const user = useSelector(userSelector);
  return (
    <View
      style={[styles.imageBorder, focused ? styles.imageBorderFocused : null]}>
      {user?.profilePictureUrl && (
        <Avatar
          uri={user.profilePictureUrl}
          size={rem(22)}
          borderRadius={rem(11)}
          allowFullScreen={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageBorder: {
    borderRadius: 15,
    borderWidth: 1.5,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderColor: COLORS.gulfBlue,
  },
  imageBorderFocused: {
    borderColor: COLORS.persianBlue,
  },
});
