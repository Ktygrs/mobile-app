// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {AppleIconSvg} from '@svg/AppleIcon';
import {DiscordIconSvg} from '@svg/DiscordIcon';
import {FacebookIconSvg} from '@svg/FacebookIcon';
import {FollowTwitterIconSvg} from '@svg/FollowTwitterIcon';
import {GoogleIconSvg} from '@svg/GoogleIcon';
import {MicrosoftIconSvg} from '@svg/MicrosoftIcon';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {isIOS, rem} from 'rn-units';

export enum ESocialType {
  apple,
  google,
  discord,
  facebook,
  microsoft,
  twitter,
}

interface SocialSignInProps {
  onPress: (type: ESocialType) => void;
}

export const SocialSignIn = ({onPress}: SocialSignInProps) => {
  const iconPress = (type: ESocialType) => () => onPress(type);
  return (
    <View style={styles.container}>
      {isIOS ? (
        <Touchable style={styles.button} onPress={iconPress(ESocialType.apple)}>
          <AppleIconSvg />
        </Touchable>
      ) : null}

      <Touchable style={styles.button} onPress={iconPress(ESocialType.google)}>
        <GoogleIconSvg />
      </Touchable>

      <Touchable style={styles.button} onPress={iconPress(ESocialType.discord)}>
        <DiscordIconSvg />
      </Touchable>

      <Touchable
        style={styles.button}
        onPress={iconPress(ESocialType.facebook)}>
        <FacebookIconSvg />
      </Touchable>

      <Touchable
        style={styles.button}
        onPress={iconPress(ESocialType.microsoft)}>
        <MicrosoftIconSvg />
      </Touchable>

      <Touchable style={styles.button} onPress={iconPress(ESocialType.twitter)}>
        <FollowTwitterIconSvg />
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rem(10),
  },
  button: {
    padding: rem(9),
  },
});
