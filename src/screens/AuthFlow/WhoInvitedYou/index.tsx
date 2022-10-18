// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/Inputs/CommonInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {ENV} from '@constants/env';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {useWhoInvitedYou} from '@screens/AuthFlow/WhoInvitedYou/hooks/useWhoInvitedYou';
import {FinalizeRegistrationStep} from '@screens/Templates/FinalizeRegistrationStep';
import {BigHeader} from '@screens/Templates/FinalizeRegistrationStep/components/BigHeader';
import {Info} from '@screens/Templates/FinalizeRegistrationStep/components/Info';
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
    validationLoading,
    isSuccessValidation,
    onChangeRefUsername,
    updateError,
    updateLoading,
    onSubmit,
    onSkip,
  } = useWhoInvitedYou();

  return (
    <FinalizeRegistrationStep
      title={t('whoInvitedYou.title')}
      header={
        <BigHeader
          title={t('whoInvitedYou.title_multiline')}
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
          errorText={validationError || updateError}
          loading={validationLoading}
          validated={isSuccessValidation}
        />
      }
      info={
        <Info
          text={
            !ENV.REQUIRE_REFERRAL_REGISTRATION_STEP && (
              <>
                <Text style={styles.infoText}>
                  {t('whoInvitedYou.dontHaveInvitationCode')}
                </Text>
                <Touchable onPress={onSkip} hitSlop={SMALL_BUTTON_HIT_SLOP}>
                  <Text style={styles.infoLink}>
                    {t('whoInvitedYou.tapHere')}
                  </Text>
                </Touchable>
              </>
            )
          }
          tooltip={t('whoInvitedYou.dontHaveCodeTip')}
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
  infoLink: {
    ...font(13, 24, 'bold', 'primaryDark'),
  },
});
