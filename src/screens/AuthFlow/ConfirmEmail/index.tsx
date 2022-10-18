// SPDX-License-Identifier: BUSL-1.1

import {CodeInput} from '@components/Inputs/CodeInput';
import {ResendButton} from '@screens/AuthFlow/ConfirmEmail/components/ResendButton';
import {WrongEmailButton} from '@screens/AuthFlow/ConfirmEmail/components/WrongEmailButton';
import {useConfirmEmail} from '@screens/AuthFlow/ConfirmEmail/hooks/useConfirmEmail';
import {FinalizeRegistrationStep} from '@screens/Templates/FinalizeRegistrationStep';
import {BigHeader} from '@screens/Templates/FinalizeRegistrationStep/components/BigHeader';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

export const ConfirmEmail = () => {
  const {
    code,
    email,
    setCode,
    validateError,
    validateLoading,
    isSuccessValidation,
  } = useConfirmEmail();

  return (
    <FinalizeRegistrationStep
      title={t('confirm_code.title')}
      header={
        <BigHeader
          title={t('confirm_code.title')}
          description={t('confirm_code.description', {source: email})}
          progressPercentage={66}
          containerStyle={styles.bigHeader}
        />
      }
      imageSource={require('./assets/images/confirm-email.png')}
      input={
        <CodeInput
          autoFocus={true}
          containerStyle={styles.input}
          value={code}
          setValue={setCode}
          errorText={validateError}
          editable={!validateLoading}
          validated={isSuccessValidation}
        />
      }
      info={<ResendButton />}
      button={<WrongEmailButton />}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: rem(6),
  },
  bigHeader: {
    marginBottom: rem(50),
  },
});
