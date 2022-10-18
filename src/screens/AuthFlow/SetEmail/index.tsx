// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/Inputs/CommonInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {useSetEmail} from '@screens/AuthFlow/SetEmail/hooks/useSetEmail';
import {FinalizeRegistrationStep} from '@screens/Templates/FinalizeRegistrationStep';
import {BigHeader} from '@screens/Templates/FinalizeRegistrationStep/components/BigHeader';
import {Info} from '@screens/Templates/FinalizeRegistrationStep/components/Info';
import {EmailIcon} from '@svg/EmailIcon';
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
        <CommonInput
          label={t('confirm_email.input_placeholder')}
          onChangeText={onChangeEmail}
          icon={<EmailIcon color={COLORS.secondary} />}
          value={email}
          errorText={updateError}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          autoComplete={'email'}
          autoCapitalize={'none'}
          autoCorrect={true}
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
