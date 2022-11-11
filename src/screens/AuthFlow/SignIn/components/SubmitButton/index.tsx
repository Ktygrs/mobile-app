// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {useResend} from '@hooks/useResend';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress: () => void;
  loading: boolean;
  lastSendTimestamp: number | null;
};

export const SubmitButton = ({onPress, loading, lastSendTimestamp}: Props) => {
  const {resendAvailable} = useResend({lastSendTimestamp});
  return (
    <PrimaryButton
      text={t('signIn.logInSignUp')}
      onPress={onPress}
      style={[styles.button, !resendAvailable ? styles.button_disabled : null]}
      disabled={!resendAvailable}
      loading={loading}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: rem(24),
    height: rem(52),
    alignSelf: 'center',
    paddingHorizontal: rem(54),
  },
  button_disabled: {
    opacity: 0.6,
  },
});
