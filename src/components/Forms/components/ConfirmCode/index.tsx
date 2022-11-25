// SPDX-License-Identifier: BUSL-1.1

import {SCREEN_SIDE_OFFSET, smallHeightDevice} from '@constants/styles';
import {Images} from '@images';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo, ReactNode} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  codeSource: string;
  CodeInput: ReactNode;
  ResendButton: ReactNode;
  BackButton: ReactNode;
};

export const ConfirmCode = memo(
  ({codeSource, CodeInput, ResendButton, BackButton}: Props) => {
    return (
      <View style={styles.container}>
        <Image
          source={Images.phone.confirmPhoneNumber}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{t('confirm_code.title')}</Text>
        <Text style={styles.codeSourceDescText}>
          {t('confirm_code.description')}
        </Text>
        <Text style={styles.codeSourceText}>{codeSource}</Text>
        <View style={styles.codeInput}>{CodeInput}</View>
        <View style={styles.resendButton}>{ResendButton}</View>
        <View style={styles.backButton}>{BackButton}</View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: rem(10),
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
  image: {
    alignSelf: 'center',
    height: smallHeightDevice ? rem(80) : rem(140),
  },
  title: {
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(2),
    ...font(24, 29, 'black', 'primaryDark'),
  },
  codeSourceDescText: {
    marginTop: rem(10),
    textAlign: 'center',
    ...font(16, 26, 'medium', 'secondary'),
  },
  codeSourceText: {
    textAlign: 'center',
    ...font(16, 26, 'bold', 'codeFieldText'),
  },
  codeInput: {
    marginTop: rem(30),
    marginHorizontal: rem(6),
  },
  resendButton: {
    marginTop: rem(25),
  },
  backButton: {
    marginTop: rem(36),
    marginBottom: rem(18),
  },
});
