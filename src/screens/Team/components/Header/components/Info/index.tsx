// SPDX-License-Identifier: BUSL-1.1

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {userReferralCountSelector} from '@store/modules/Referrals/selectors';
import {TeamInactiveIcon} from '@svg/TeamInactiveIcon';
import {WalletIcon} from '@svg/WalletIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const INFO_HEIGHT = rem(84);

export const Info = () => {
  const refsCount = useSelector(userReferralCountSelector);
  const earningsValue = '121,985.42';

  return (
    <View style={styles.container}>
      <View style={styles.centeredRow}>
        <TeamInactiveIcon color={COLORS.white} />
        <View style={styles.body}>
          <Text style={styles.title}>{t('team.header.referrals')}</Text>
          <Text style={styles.valueText}>{refsCount}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.centeredRow}>
        <WalletIcon width={rem(25)} height={rem(25)} color={COLORS.white} />
        <View style={styles.body}>
          <Text style={styles.title}>{t('team.header.earnings')}</Text>
          <View style={styles.centeredRow}>
            <FormattedNumber
              number={earningsValue}
              bodyStyle={styles.valueText}
              decimalsStyle={styles.decimalsText}
              trim={true}
            />
            <IceLabel
              textStyle={styles.valueText}
              iconOffsetY={-1}
              iconSize={rem(16)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: rem(5),
    height: INFO_HEIGHT,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.white,
    height: rem(22),
  },
  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    marginLeft: rem(8.5),
  },
  title: {
    ...font(12, 14, 'medium'),
    opacity: 0.7,
    marginBottom: 1,
  },
  valueText: {
    ...font(15, 18, 'bold'),
  },
  decimalsText: {
    ...font(8, 8, 'semibold'),
  },
});
