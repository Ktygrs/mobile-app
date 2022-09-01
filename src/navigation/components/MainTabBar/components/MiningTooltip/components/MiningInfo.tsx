// SPDX-License-Identifier: BUSL-1.1

import {DataCell, DataCellSeparator} from '@components/DataCell';
import {COLORS} from '@constants/colors';
import {ClockIcon} from '@svg/ClockIcon';
import {LogoIcon} from '@svg/LogoIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  timeLeft: string;
  rate: string;
};

export const MiningInfo = ({timeLeft, rate}: Props) => {
  const [rateInteger, rateFractional] = rate.split('.');
  return (
    <View style={styles.container}>
      <DataCell
        icon={
          <ClockIcon
            width={rem(25)}
            height={rem(24)}
            color={COLORS.primaryLight}
          />
        }
        label={t('staking.time_left')}
        value={timeLeft}
      />
      <DataCellSeparator />
      <DataCell
        icon={
          <LogoIcon
            width={rem(24)}
            height={rem(24)}
            color={COLORS.primaryLight}
          />
        }
        label={t('staking.mining_rate')}
        value={rateInteger}
        fractions={rateFractional}
        currency={t('home.wallet.currency')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rem(20),
  },
});
