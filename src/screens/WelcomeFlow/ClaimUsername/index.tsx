// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/Inputs/CommonInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {FinalizeRegistrationStep} from '@screens/Templates/FinalizeRegistrationStep';
import {BigHeader} from '@screens/Templates/FinalizeRegistrationStep/components/BigHeader';
import {Info} from '@screens/Templates/FinalizeRegistrationStep/components/Info';
import {useClaimUsername} from '@screens/WelcomeFlow/ClaimUsername/hooks/useClaimUsername';
import {ManIcon} from '@svg/ManIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

export const ClaimUsername = () => {
  const {
    username,
    validationError,
    validationLoading,
    isSuccessValidation,
    updateError,
    updateLoading,
    onChangeUsername,
    onSubmit,
  } = useClaimUsername();

  return (
    <FinalizeRegistrationStep
      title={t('claimUsername.title')}
      header={
        <BigHeader
          title={t('claimUsername.title_multiline')}
          description={t('claimUsername.description')}
          progressPercentage={0}
        />
      }
      imageSource={require('./assets/images/claim-username.png')}
      input={
        <CommonInput
          label={t('claimUsername.inputPlaceholder')}
          onChangeText={onChangeUsername}
          icon={
            <ManIcon
              color={COLORS.secondary}
              width={rem(16)}
              height={rem(16)}
            />
          }
          value={username}
          errorText={validationError || updateError}
          loading={validationLoading}
          validated={isSuccessValidation}
        />
      }
      info={
        <Info
          text={
            <Text style={styles.infoText}>
              {t('claimUsername.note')}
              <Text style={styles.infoExampleText}>
                {t('claimUsername.note_example')}
              </Text>
            </Text>
          }
        />
      }
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

const styles = StyleSheet.create({
  infoText: {
    ...font(13, 18, 'regular', 'secondary'),
  },
  infoExampleText: {
    ...font(13, 18, 'regular', 'catalinaBlue'),
  },
});
