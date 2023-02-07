// SPDX-License-Identifier: BUSL-1.1

import {UpdateAccountField} from '@components/Forms/components/UpdateAccountField';
import {useModifyPhoneNumber} from '@components/Forms/ModifyPhoneNumberForm/hooks/useModifyPhoneNumber';
import {PhoneNumberInput} from '@components/Inputs/PhoneNumberInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {Country} from '@constants/countries';
import {useResendCountdown} from '@hooks/useResendCountdown';
import {t} from '@translations/i18n';
import React from 'react';

type Props = {
  initialPhoneNumber?: string | null;
  selectedCountry?: Country | null;
};

export const ModifyPhoneNumberForm = ({
  initialPhoneNumber,
  selectedCountry,
}: Props) => {
  const {
    phoneNumberBody,
    onChangePhone,
    modifyPhoneNumber,
    isModifyPhoneLoading,
    modifyPhoneFailedReason,
    smsSentTimestamp,
  } = useModifyPhoneNumber({
    initialPhoneNumber,
    selectedCountry,
  });
  const {resendAvailable} = useResendCountdown({
    lastSendTimestamp: smsSentTimestamp,
  });

  return (
    <UpdateAccountField
      title={t('confirm_phone.modify_title')}
      description={t('confirm_phone.modify_description')}
      Input={
        <PhoneNumberInput
          selectedCountry={selectedCountry}
          value={phoneNumberBody}
          onChangePhone={onChangePhone}
          editable={!isModifyPhoneLoading}
          errorText={modifyPhoneFailedReason}
        />
      }
      Button={
        <PrimaryButton
          text={t('confirm_phone.button')}
          onPress={modifyPhoneNumber}
          loading={isModifyPhoneLoading}
          disabled={!resendAvailable}
        />
      }
    />
  );
};
