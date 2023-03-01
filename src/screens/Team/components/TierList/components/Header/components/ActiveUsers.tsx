// SPDX-License-Identifier: BUSL-1.1

import {ReferralType} from '@api/user/types';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';

export const ActiveUsers = ({referralType}: {referralType: ReferralType}) => {
  const {total = 0, active = 0} = useSelector(
    referralsSelector({referralType}),
  );
  return (
    <Text style={styles.title}>
      <Text style={styles.label}>{`${t('users.active')}: `}</Text>
      {`${active}/${total}`}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    ...font(14, null, 'regular', 'secondary'),
  },
  title: {
    ...font(14, null, 'regular', 'primaryDark'),
  },
});
