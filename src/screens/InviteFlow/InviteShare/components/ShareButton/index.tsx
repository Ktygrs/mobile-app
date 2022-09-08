// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {Social} from 'react-native-share';
import {rem, screenWidth} from 'rn-units';

const BUTTON_LEFT_OFFSET = 32;
const BUTTON_SIDE_DIMENSTION = (screenWidth - BUTTON_LEFT_OFFSET * 5) / 4;

export type SocialType =
  | 'Telegram'
  | 'Twitter'
  | 'WhatsApp'
  | 'Instagram'
  | 'Email'
  | 'FB'
  | 'CopyLink'
  | 'More';

export type SocialShareButtonType = {
  type: SocialType;
  title: string;
  icon: number;
  social?: Social;
};

interface ShareButtonProps {
  button: SocialShareButtonType;
  onPress: (type: SocialType) => void;
}
export const ShareButton = ({button, onPress}: ShareButtonProps) => {
  const handlePress = () => {
    onPress(button.type);
  };

  return (
    <Touchable style={styles.button} onPress={handlePress}>
      <Image style={styles.icon} source={button.icon} />
      <Text style={styles.buttonTitle}>{t(button.title)}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: BUTTON_SIDE_DIMENSTION,
    marginLeft: BUTTON_LEFT_OFFSET,
    marginTop: rem(35),
  },
  icon: {
    width: BUTTON_SIDE_DIMENSTION,
    height: BUTTON_SIDE_DIMENSTION,
  },
  buttonTitle: {
    marginTop: rem(8),
    alignSelf: 'center',
    ...font(11, null, 'regular', 'secondary'),
  },
});