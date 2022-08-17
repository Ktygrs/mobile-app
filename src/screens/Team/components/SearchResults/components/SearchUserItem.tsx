// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {UserListItem} from '@components/UserListItem';
import {UserListPingButton} from '@components/UserListItem/components/UserListPingButton';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {t} from '@translations/i18n';
import {getCountryByCode} from '@utils/country';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {font} from 'rn-units';

type Props = {
  user: User;
};

export const SearchUserItem = ({user}: Props) => {
  const country = getCountryByCode(user.country);
  const referralType = t(`users.referralType.${user.referralType}`, {
    defaultValue: '',
  });
  return (
    <UserListItem
      name={
        <>
          {country.current
            ? `${country.current.flag} ${user.username}`
            : user.username}
          <Text style={styles.referralTypeText}>{' ' + referralType}</Text>
        </>
      }
      note={user.phoneNumber}
      profilePictureUrl={user.profilePictureUrl}
      active={user.active}
      key={user.id}
      AdditionalInfoComponent={<UserListPingButton pinged={user.pinged} />}
    />
  );
};

const styles = StyleSheet.create({
  referralTypeText: {
    color: COLORS.emperor,
    fontSize: font(13.5),
    fontFamily: FONTS.primary.medium,
  },
});
