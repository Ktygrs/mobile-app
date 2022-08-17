// SPDX-License-Identifier: BUSL-1.1

import {UserListItemButton} from '@components/UserListItem/components/UserListItemButton';
import {COLORS} from '@constants/colors';
import {PingIcon} from '@svg/PingIcon';
import {t} from '@translations/i18n';
import React from 'react';

type Props = {
  pinged?: boolean | null;
};

export const UserListPingButton = ({pinged}: Props) => {
  if (pinged == null) {
    return null;
  }

  return (
    <UserListItemButton
      disabled={pinged}
      icon={<PingIcon fill={pinged ? COLORS.cadetBlue : COLORS.primaryDark} />}
      text={t('users.ping')}
      onPress={() => {}}
    />
  );
};
