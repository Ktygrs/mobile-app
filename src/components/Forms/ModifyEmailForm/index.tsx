// SPDX-License-Identifier: BUSL-1.1

import {UpdateAccountField} from '@components/Forms/components/UpdateAccountField';
import {Note} from '@components/Forms/ModifyEmailForm/components/Note';
import {useModifyEmail} from '@components/Forms/ModifyEmailForm/hooks/useModifyEmail';
import {EmailInput} from '@components/Inputs/EmailInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {useResendCountdown} from '@hooks/useResendCountdown';
import {t} from '@translations/i18n';
import React from 'react';

export const ModifyEmailForm = () => {
  const {
    email,
    onChangeEmail,
    modifyEmail,
    isModifyEmailLoading,
    modifyEmailFailedReason,
    emailSentTimestamp,
  } = useModifyEmail();
  const {resendAvailable} = useResendCountdown({
    lastSendTimestamp: emailSentTimestamp,
  });

  return (
    <UpdateAccountField
      title={t('confirm_email.modify_title')}
      description={t('confirm_email.modify_description')}
      Input={
        <EmailInput
          value={email}
          onChangeText={onChangeEmail}
          editable={!isModifyEmailLoading}
          errorText={modifyEmailFailedReason}
        />
      }
      Button={
        <PrimaryButton
          text={t('button.continue')}
          onPress={modifyEmail}
          loading={isModifyEmailLoading}
          disabled={!resendAvailable}
        />
      }
      Note={<Note />}
    />
  );
};
