// SPDX-License-Identifier: BUSL-1.1

import {t} from '@translations/i18n';
import {formatPhoneNumber} from '@utils/phoneNumber';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  phone: string | null;
};

export const Description = memo(({phone}: Props) => {
  return (
    <>
      <Text style={styles.descriptionText}>
        {t('confirm_code.description')}
      </Text>
      <Text style={styles.phoneText}>{formatPhoneNumber(phone ?? '')}</Text>
    </>
  );
});

const styles = StyleSheet.create({
  descriptionText: {
    marginTop: rem(24),
    textAlign: 'center',
    ...font(16, 26, 'medium', 'secondary'),
  },
  phoneText: {
    textAlign: 'center',
    ...font(16, 26, 'bold', 'codeFieldText'),
  },
});
