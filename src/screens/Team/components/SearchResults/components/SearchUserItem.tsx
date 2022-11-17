// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {UserListItem} from '@components/ListItems/UserListItem';
import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {t} from '@translations/i18n';
import {getCountryByCode} from '@utils/country';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

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
      userId={user.id}
      key={user.id}
      AdditionalInfoComponent={<UserListPingButton pinged={user.pinged} />}
    />
  );
};

const styles = StyleSheet.create({
  referralTypeText: {
    ...font(13.5, null, 'medium', 'emperor'),
  },
});
