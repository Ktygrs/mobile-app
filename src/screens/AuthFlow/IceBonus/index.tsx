// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {CurrentBalance} from '@screens/AuthFlow/IceBonus/components/CurrentBalance';
import {useIceBonus} from '@screens/AuthFlow/IceBonus/hooks/useIceBonus';
import {FinalizeRegistrationStep} from '@screens/Templates/FinalizeRegistrationStep';
import {BigHeader} from '@screens/Templates/FinalizeRegistrationStep/components/BigHeader';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

export const IceBonus = () => {
  const {currentBalance, loading, onSubmit} = useIceBonus();

  return (
    <FinalizeRegistrationStep
      title={t('ice_bonus.title')}
      header={
        <BigHeader
          title={t('ice_bonus.title')}
          description={t('ice_bonus.description', {value: currentBalance})}
          progressPercentage={100}
          containerStyle={styles.bigHeader}
        />
      }
      imageSource={require('./assets/images/ice-bonus.png')}
      info={<CurrentBalance value={currentBalance} />}
      button={
        <PrimaryButton
          text={t('button.complete')}
          onPress={onSubmit}
          loading={loading}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  bigHeader: {
    marginBottom: rem(36),
  },
});
