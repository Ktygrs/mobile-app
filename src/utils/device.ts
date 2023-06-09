// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {dayjs} from '@services/dayjs';
import {logError} from '@services/logging';
import {Linking} from 'react-native';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';
import {
  InAppBrowser,
  InAppBrowserOptions,
} from 'react-native-inappbrowser-reborn';
import {isIOS, wait} from 'rn-units';

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

export const openLinkWithInAppBrowser = async ({
  url,
  options,
}: {
  url: string;
  options?: InAppBrowserOptions;
}) => {
  const config: InAppBrowserOptions = {
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
  };

  try {
    const result = await InAppBrowser.open(url, config);

    return result;
  } catch (error) {
    // Sometimes browser stays open, you just need to close it manually
    InAppBrowser.close();
    await wait(300);

    return InAppBrowser.open(url, config);
  }
};

export const getTimezoneOffset = () => {
  const timezoneOffset = new Date().getTimezoneOffset();

  /**
   * The number of minutes returned by getTimezoneOffset()
   * is positive if the local time zone is behind UTC,
   * and negative if the local time zone is ahead of UTC.
   * For example, for UTC+10, -600 will be returned.
   */
  const sign = timezoneOffset > 0 ? '-' : '+';

  const formattedOffset = dayjs
    .duration(Math.abs(timezoneOffset), 'm')
    .format('HH:mm');

  return `${sign}${formattedOffset}`;
};
