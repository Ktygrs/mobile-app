// SPDX-License-Identifier: BUSL-1.1

import {ReferralType} from '@api/user/types';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {t} from '@translations/i18n';
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';

export const Earnings = ({referralType}: {referralType: ReferralType}) => {
  const balanceSummary = useSelector(balanceSummarySelector);
  const balance = balanceSummary?.[referralType === 'T1' ? 't1' : 't2'];
  const title =
    referralType === 'T1'
      ? t('team.tier_one.header_list.title_earnings')
      : t('team.tier_two.header_list.title_earnings');
  return (
    <Text style={styles.title}>
      <Text style={styles.label}>{`${title}: `}</Text>
      {balance ? formatNumberString(balance) : ''}
      <IceLabel iconSize={16} color={COLORS.primaryDark} />
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
