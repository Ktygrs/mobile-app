// SPDX-License-Identifier: BUSL-1.1

import {DataCell} from '@components/DataCell';
import {COLORS} from '@constants/colors';
import {LogoIcon} from '@svg/LogoIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {rem} from 'rn-units';

type Props = {
  value: string;
};

export const BlockchainCell = ({value}: Props) => {
  const [valueInteger, valueFractional] = value.split('.');
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
      value={valueInteger}
      fractions={valueFractional}
      currency={t('home.wallet.currency')}
    />
  );
};
