// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/Inputs/CommonInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {ENV} from '@constants/env';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {FinalizeRegistrationStep} from '@screens/Templates/FinalizeRegistrationStep';
import {BigHeader} from '@screens/Templates/FinalizeRegistrationStep/components/BigHeader';
import {Info} from '@screens/Templates/FinalizeRegistrationStep/components/Info';
import {useWhoInvitedYou} from '@screens/WelcomeFlow/WhoInvitedYou/hooks/useWhoInvitedYou';
import {ManIcon} from '@svg/ManIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

export const WhoInvitedYou = () => {
  const {
    refUsername,
    validationError,
    updateRefByUsernameError,
    validationLoading,
    updateAccountFinished,
    onChangeRefUsername,
    updateError,
    updateLoading,
    onSubmit,
    onBack,
  } = useWhoInvitedYou();

  return (
    <FinalizeRegistrationStep
      title={t('whoInvitedYou.title')}
      showBackButton={true}
      onBackPress={onBack}
      header={
        <BigHeader
          title={t('whoInvitedYou.title')}
          description={t('whoInvitedYou.description')}
          progressPercentage={33}
        />
      }
      imageSource={require('./assets/images/who-invited-you.png')}
      input={
        <CommonInput
          label={t('whoInvitedYou.inputPlaceholder')}
          onChangeText={onChangeRefUsername}
          icon={
            <ManIcon
              color={COLORS.secondary}
              width={rem(16)}
              height={rem(16)}
            />
          }
          value={refUsername}
          errorText={validationError || updateRefByUsernameError || updateError}
          loading={validationLoading}
          validated={updateAccountFinished}
        />
      }
      info={
        <Info
          text={
            !ENV.REQUIRE_REFERRAL_REGISTRATION_STEP && (
              <>
                <Text style={styles.infoText}>
                  {t('whoInvitedYou.dontHaveInvitationCode', {value: 25})}
                </Text>
              </>
            )
          }
          textStyle={styles.infoTextContainer}
          tooltip={t('whoInvitedYou.dontHaveCodeTip')}
        />
      }
      button={
        <PrimaryButton
          text={t('button.complete')}
          onPress={onSubmit}
          loading={updateLoading}
          disabled={
            refUsername === '' ||
            !!validationError ||
            !!updateRefByUsernameError ||
            updateLoading
          }
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  infoText: {
    ...font(13, 18, 'regular', 'secondary'),
  },
  infoTextContainer: {
    marginRight: SCREEN_SIDE_OFFSET,
  },
});
