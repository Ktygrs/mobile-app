// SPDX-License-Identifier: BUSL-1.1

import {DataCell} from '@components/DataCell';
import {COLORS} from '@constants/colors';
import {WalletIcon} from '@svg/WalletIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {rem} from 'rn-units';

type Props = {
  value: string;
};

export const WalletCell = ({value}: Props) => {
  const [valueInteger, valueFractional] = value.split('.');
  return (
    <DataCell
      icon={
        <WalletIcon
          width={rem(21)}
          height={rem(21)}
          color={COLORS.primaryLight}
        />
      }
      label={t('balance_popup.wallet')}
      value={valueInteger}
      fractions={valueFractional}
      currency={t('home.wallet.currency')}
    />
  );
};
