// SPDX-License-Identifier: BUSL-1.1

import {FormattedNumber} from '@components/Labels/FormattedNumber';
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
      <View style={styles.flexStartRow}>
        <TeamInactiveIcon
          color={COLORS.white}
          width={rem(38)}
          height={rem(38)}
        />
        <View style={styles.body}>
          <Text style={styles.title}>{t('team.header.referrals')}</Text>
          <Text style={styles.valueText}>{refsCount}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.flexEndRow}>
        <WalletIcon width={rem(25)} height={rem(25)} color={COLORS.white} />
        <View style={styles.body2}>
          <Text style={styles.title}>{t('team.header.earnings')}</Text>
          <View style={styles.bodyContainer}>
            <FormattedNumber
              number={earningsValue}
              bodyStyle={styles.valueText}
              decimalsStyle={styles.decimalsText}
              trim={true}
            />
            <Text style={styles.valueText}> {t('general.ice')}</Text>
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
    height: INFO_HEIGHT,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.white,
    height: rem(22),
  },
  flexStartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  flexEndRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    paddingRight: rem(5),
  },
  body: {
    marginLeft: rem(10),
    justifyContent: 'center',
  },
  body2: {
    marginLeft: rem(14),
    justifyContent: 'center',
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...font(12, 18, 'medium'),
    opacity: 0.7,
  },
  valueText: {
    paddingTop: rem(2),
    ...font(15, 18, 'bold'),
  },
  decimalsText: {
    ...font(8, 8, 'semibold'),
  },
});
