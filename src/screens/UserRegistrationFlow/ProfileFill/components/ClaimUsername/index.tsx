// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/Inputs/CommonInput';
import {COLORS} from '@constants/colors';
import {ProfileFillStepMethods} from '@screens/UserRegistrationFlow/ProfileFill';
import {useClaimUsername} from '@screens/UserRegistrationFlow/ProfileFill/components/ClaimUsername/hooks/useClaimUsername';
import {ClaimUsernameSvg} from '@svg/ClaimUsername';
import {ManIcon} from '@svg/ManIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {forwardRef, useImperativeHandle} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {rem, screenHeight} from 'rn-units';

const h = (screenHeight * 291) / 811;
const w = (h * 258) / 291;

export const ClaimUsername = forwardRef<ProfileFillStepMethods>(
  (_, forwardedRef) => {
    const {
      username,
      validationError,
      validationLoading,
      isSuccessValidation,
      onChangeUsername,
      onSubmit,
    } = useClaimUsername();

    useImperativeHandle(forwardedRef, () => ({submit: onSubmit}));

    return (
      <ScrollView>
        <View style={styles.container}>
          <ClaimUsernameSvg width={w} height={h} />

          <Text style={styles.title}>{t('claimNickname.title')}</Text>
          <Text style={styles.description}>
            {t('claimNickname.description')}
          </Text>

          <CommonInput
            value={username}
            placeholder={t('claimNickname.inputPlaceholder')}
            onChangeText={onChangeUsername}
            icon={
              <ManIcon
                color={
                  isSuccessValidation ? COLORS.shamrock : COLORS.secondaryLight
                }
              />
            }
            containerStyle={styles.input}
            errorText={validationError}
            loading={validationLoading}
          />
        </View>
      </ScrollView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: rem(80),
    paddingBottom: 10,
  },
  title: {
    marginTop: rem(24),
    marginBottom: rem(11),
    textAlign: 'center',
    ...font(28, null, 'black', 'primaryDark'),
  },
  description: {
    textAlign: 'center',
    ...font(14, 24, 'regular', 'secondary'),
  },
  input: {
    marginTop: rem(30),
    width: rem(247),
  },
});
