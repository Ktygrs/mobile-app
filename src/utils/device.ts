// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {logError} from '@services/logging';
import {Linking} from 'react-native';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';
import {
  InAppBrowser,
  InAppBrowserOptions,
} from 'react-native-inappbrowser-reborn';
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
  } catch (error) {
    logError(error);
  }
};

export const openLinkWithInAppBrowser = ({
  url,
  options,
}: {
  url: string;
  options?: InAppBrowserOptions;
}) => {
  return InAppBrowser.open(url, {
    // iOS Properties
    dismissButtonStyle: 'cancel',
    preferredBarTintColor: COLORS.primary,
    preferredControlTintColor: COLORS.white,
    readerMode: false,
    animated: true,
    modalPresentationStyle: 'fullScreen',
    modalTransitionStyle: 'coverVertical',
    modalEnabled: true,
    enableBarCollapsing: false,
    // Android Properties
    showTitle: true,
    toolbarColor: COLORS.primary,
    secondaryToolbarColor: COLORS.black,
    navigationBarColor: COLORS.black,
    navigationBarDividerColor: COLORS.white,
    enableUrlBarHiding: true,
    enableDefaultShare: true,
    forceCloseOnRedirection: false,
    ...options,
  });
};
