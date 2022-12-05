// SPDX-License-Identifier: BUSL-1.1

import {ConfirmCode} from '@components/Forms/components/ConfirmCode';
import {ConfirmCodeBack} from '@components/Forms/components/ConfirmCode/components/ConfirmCodeBack';
import {useConfirmEmail} from '@components/Forms/ConfirmEmailCodeForm/hooks/useConfirmEmail';
import {CodeInput} from '@components/Inputs/CodeInput';
import {ResendButton} from '@components/ResendButton';
import {useNavigation} from '@react-navigation/native';
import {t} from '@translations/i18n';
import React from 'react';

export const ConfirmEmailCodeForm = () => {
  const navigation = useNavigation();
  const {
    code,
    email,
    setCode,
    resendCode,
    validationError,
    validateLoading,
    isSuccessValidation,
    emailSentTimestamp,
  } = useConfirmEmail({signOutOnSuccess: true});

  return (
    <ConfirmCode
      codeSource={email ?? ''}
      CodeInput={
        <CodeInput
          autoFocus={true}
          value={code}
          setValue={setCode}
          errorText={validationError}
          editable={!validateLoading}
          validated={isSuccessValidation}
        />
      }
      ResendButton={
        <ResendButton
          onResend={resendCode}
          lastSendTimestamp={emailSentTimestamp}
        />
      }
      BackButton={
        <ConfirmCodeBack
          onPress={navigation.goBack}
          text={t('confirm_email.wrong_email')}
        />
      }
    />
  );
};
