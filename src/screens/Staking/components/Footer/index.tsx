// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {StakeIcon} from '@svg/StakeIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const IS_STAKING_ACTIVE = {current: false};

export const Footer = memo(() => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.noteText}>
        {t('staking.terms_agree')}{' '}
        <Text style={styles.termsLink} onPress={() => {}}>
          {t('staking.staking_terms')}
        </Text>
        . {t('stake.lock_note')}
      </Text>
      <PrimaryButton
        onPress={() => {
          navigation.goBack();
          IS_STAKING_ACTIVE.current = true;
        }}
        text={t('staking.stake_now')}
        style={styles.button}
        icon={
          <StakeIcon color={COLORS.white} width={rem(18)} height={rem(18)} />
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(51),
    marginHorizontal: rem(38),
  },
  noteText: {
    textAlign: 'center',
    ...font(12, 19, 'medium', 'primaryDark'),
  },
  termsLink: {
    color: COLORS.primaryLight,
  },
  button: {
    height: rem(48),
    marginTop: rem(10),
    backgroundColor: COLORS.primaryLight,
    borderRadius: rem(16),
  },
});
