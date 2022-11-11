// SPDX-License-Identifier: BUSL-1.1

import {EmailInput} from '@components/Inputs/EmailInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {FinalizeRegistrationStep} from '@screens/Templates/FinalizeRegistrationStep';
import {BigHeader} from '@screens/Templates/FinalizeRegistrationStep/components/BigHeader';
import {Info} from '@screens/Templates/FinalizeRegistrationStep/components/Info';
import {useSetEmail} from '@screens/WelcomeFlow/SetEmail/hooks/useSetEmail';
import {t} from '@translations/i18n';
import React from 'react';

export const SetEmail = () => {
  const {email, onChangeEmail, updateError, updateLoading, onSubmit} =
    useSetEmail();

  return (
    <FinalizeRegistrationStep
      title={t('confirm_email.title')}
      header={
        <BigHeader
          title={t('confirm_email.title_multiline')}
          description={t('confirm_email.description')}
          progressPercentage={66}
        />
      }
      imageSource={require('./assets/images/set-email.png')}
      input={
        <EmailInput
          onChangeText={onChangeEmail}
          value={email}
          errorText={updateError}
        />
      }
      info={<Info text={t('confirm_email.note')} />}
      button={
        <PrimaryButton
          text={t('button.next_step')}
          onPress={onSubmit}
          loading={updateLoading}
        />
      }
    />
  );
};
