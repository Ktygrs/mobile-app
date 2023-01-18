// SPDX-License-Identifier: BUSL-1.1

import {CheckBox} from '@components/CheckBox';
import {IceLabel} from '@components/Labels/IceLabel';
import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DEFAULT_CONFIRM_NO_BUTTON} from '@screens/Dialogs/Confirm';
import {StakeIcon} from '@svg/StakeIcon';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {reactStringReplace} from '@utils/react';
import {font} from '@utils/styles';
import React, {memo, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {isAndroid, rem} from 'rn-units';

export const IS_STAKING_ACTIVE = {current: false};

export const Footer = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const onStakePress = () => {
    navigation.navigate('Confirm', {
      title: t('staking.confirm_title'),
      subtitle: t('staking.confirm_subtitle'),
      buttons: [
        DEFAULT_CONFIRM_NO_BUTTON,
        {
          label: t('button.confirm'),
          onPress: () => {
            navigation.goBack();
            IS_STAKING_ACTIVE.current = true;
          },
        },
      ],
    });
  };

  const termsAgreeText = useMemo(() => {
    const onTermsPress = () => {
      openLinkWithInAppBrowser({url: LINKS.TERMS});
    };

    const text = reactStringReplace(
      t('staking.terms_agree'),
      '[[:ice]]',
      (match, index) => (
        <IceLabel
          key={match + index}
          iconSize={14}
          color={COLORS.primaryDark}
          iconOffsetY={isAndroid ? 3 : 1}
        />
      ),
    );

    return reactStringReplace(text, '[[:link]]', (match, index) => (
      <Text key={match + index} style={styles.termsLink} onPress={onTermsPress}>
        {t('staking.staking_terms')}
      </Text>
    ));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.checkboxRow}>
        <CheckBox checked={termsAccepted} onValueChange={setTermsAccepted} />
        <Text style={styles.noteText}>{termsAgreeText}</Text>
      </View>
      <PrimaryButton
        onPress={onStakePress}
        disabled={!termsAccepted}
        text={t('staking.stake_now')}
        textStyle={styles.buttonText}
        style={[styles.button, !termsAccepted && styles.button_disabled]}
        icon={
          <StakeIcon color={COLORS.white} width={rem(18)} height={rem(18)} />
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(41),
    marginHorizontal: rem(38),
  },
  noteText: {
    marginLeft: rem(14),
    ...font(12, 19, 'medium', 'primaryDark'),
  },
  termsLink: {
    color: COLORS.primaryLight,
  },
  button: {
    height: rem(48),
    marginTop: rem(40),
    backgroundColor: COLORS.primaryLight,
    borderRadius: rem(16),
  },
  button_disabled: {
    opacity: 0.5,
  },
  buttonText: {
    ...font(14, 18, 'black', 'white'),
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
