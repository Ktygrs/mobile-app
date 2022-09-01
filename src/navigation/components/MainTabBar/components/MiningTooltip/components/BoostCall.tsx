// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StakeIcon} from '@svg/StakeIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

export const BoostCall = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  return (
    <>
      <Text style={styles.titleText}>{t('staking.appeal')}</Text>
      <Text style={styles.noteText}>{t('staking.benefits_description')}</Text>
      <PrimaryButton
        onPress={() => {
          navigation.goBack();
          setTimeout(() => navigation.navigate('Staking'));
        }}
        text={t('staking.stake_now')}
        style={styles.button}
        icon={
          <StakeIcon color={COLORS.white} width={rem(18)} height={rem(18)} />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    marginTop: rem(22),
    marginHorizontal: rem(32),
    ...font(18, 22, 'black', 'primaryDark'),
  },
  noteText: {
    textAlign: 'center',
    marginTop: rem(14),
    marginHorizontal: rem(32),
    ...font(12, 17, 'medium', 'secondary'),
  },
  button: {
    marginTop: rem(20),
    backgroundColor: COLORS.shamrock,
    height: rem(44),
    alignSelf: 'center',
    paddingHorizontal: rem(26),
    marginBottom: rem(42),
  },
});
