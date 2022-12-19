// SPDX-License-Identifier: BUSL-1.1

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {
  DataCell,
  DataCellSeparator,
} from '@navigation/components/MainTabBar/components/MiningTooltip/components/DataCell';
import {ClockIcon} from '@svg/ClockIcon';
import {LogoIcon} from '@svg/LogoIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {isAndroid, rem} from 'rn-units';

type Props = {
  timeLeft: string;
  rate: string;
};

export const MiningInfo = ({timeLeft, rate}: Props) => {
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
        value={
          <FormattedNumber
            number={rate}
            bodyStyle={styles.valueText}
            decimalsStyle={styles.valueDecimalsText}
          />
        }
        currency={
          <IceLabel
            iconOffsetY={isAndroid ? 2 : 0}
            color={COLORS.primaryDark}
            label={t('general.ice_per_hour')}
          />
        }
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
  valueText: {
    ...font(17, 20, 'bold', 'primaryDark'),
  },
  valueDecimalsText: {
    ...font(10, 12, 'bold', 'primaryDark'),
  },
});
