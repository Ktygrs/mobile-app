// SPDX-License-Identifier: BUSL-1.1

import {ConfirmCode} from '@components/Forms/components/ConfirmCode';
import {ConfirmCodeBack} from '@components/Forms/components/ConfirmCode/components/ConfirmCodeBack';
import {useConfirmPhoneNumber} from '@components/Forms/ConfirmPhoneNumberForm/hooks/useConfirmPhoneNumber';
import {CodeInput} from '@components/Inputs/CodeInput';
import {ResendButton} from '@components/ResendButton';
import {useNavigation} from '@react-navigation/native';
import {t} from '@translations/i18n';
import {formatPhoneNumber} from '@utils/phoneNumber';
import React from 'react';

export const ConfirmPhoneNumberForm = () => {
  const navigation = useNavigation();
  const {
    code,
    phoneNumber,
    setCode,
    resendCode,
    validationError,
    validateLoading,
    isSuccessValidation,
    smsSentTimestamp,
  } = useConfirmPhoneNumber();

  return (
    <ConfirmCode
      codeSource={formatPhoneNumber(phoneNumber ?? '')}
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
          lastSendTimestamp={smsSentTimestamp}
        />
      }
      BackButton={
        <ConfirmCodeBack
          onPress={navigation.goBack}
          text={t('confirm_code.wrong_number')}
        />
      }
    />
  );
};
