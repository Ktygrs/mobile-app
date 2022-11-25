// SPDX-License-Identifier: BUSL-1.1

import {UpdateAccountField} from '@components/Forms/components/UpdateAccountField';
import {useModifyPhoneNumber} from '@components/Forms/ModifyPhoneNumberForm/hooks/useModifyPhoneNumber';
import {PhoneNumberInput} from '@components/Inputs/PhoneNumberInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {useResend} from '@hooks/useResend';
import {t} from '@translations/i18n';
import React from 'react';

export const ModifyPhoneNumberForm = () => {
  const {
    phoneNumberBody,
    onChangePhone,
    modifyPhoneNumber,
    isModifyPhoneLoading,
    modifyPhoneFailedReason,
    smsSentTimestamp,
  } = useModifyPhoneNumber();
  const {resendAvailable} = useResend({lastSendTimestamp: smsSentTimestamp});

  return (
    <UpdateAccountField
      title={t('confirm_phone.modify_title')}
      description={t('confirm_phone.modify_description')}
      Input={
        <PhoneNumberInput
          value={phoneNumberBody}
          onChangePhone={onChangePhone}
          editable={!isModifyPhoneLoading}
          errorText={modifyPhoneFailedReason}
        />
      }
      Button={
        <PrimaryButton
          text={t('button.continue')}
          onPress={modifyPhoneNumber}
          loading={isModifyPhoneLoading}
          disabled={!resendAvailable}
        />
      }
    />
  );
};
