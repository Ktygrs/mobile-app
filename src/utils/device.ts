// SPDX-License-Identifier: BUSL-1.1

import {Linking} from 'react-native';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';
import {isIOS} from 'rn-units';

export function hapticFeedback(type: HapticFeedbackTypes = 'soft') {
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };
  ReactNativeHapticFeedback.trigger(type, options);
}

export const openSMS = async (phoneNumber: string, message: string) => {
  try {
    const separator = isIOS ? '&' : '?';
    const url = `sms:${phoneNumber}${separator}body=${message}`;
    await Linking.openURL(url);
  } catch (error) {}
};
