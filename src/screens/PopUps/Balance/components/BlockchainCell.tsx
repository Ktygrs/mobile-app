// SPDX-License-Identifier: BUSL-1.1

import {DataCell} from '@components/DataCell';
import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {LogoIcon} from '@svg/LogoIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet} from 'react-native';
import {isAndroid, rem} from 'rn-units';

type Props = {
  value: string;
};

export const BlockchainCell = ({value}: Props) => {
  return (
    <DataCell
      icon={
        <LogoIcon
          width={rem(24)}
          height={rem(24)}
          color={COLORS.primaryLight}
        />
      }
      label={t('balance_popup.blockchain')}
      value={
        <FormattedNumber
          number={value}
          bodyStyle={styles.valueText}
          decimalsStyle={styles.valueDecimalsText}
        />
      }
      currency={
        <IceLabel iconOffsetY={isAndroid ? 2 : 0} color={COLORS.primaryDark} />
      }
    />
  );
};

const styles = StyleSheet.create({
  valueText: {
    ...font(17, 20, 'bold', 'primaryDark'),
  },
  valueDecimalsText: {
    ...font(10, 12, 'bold', 'primaryDark'),
  },
});
