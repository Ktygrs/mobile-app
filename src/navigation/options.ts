// SPDX-License-Identifier: BUSL-1.1

import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export const tabOptions = {
  headerShown: false,
  lazy: true,
};

export const screenOptions = {
  headerShown: false,
};

export const modalOptions: NativeStackNavigationOptions = {
  presentation: 'transparentModal',
  animation: 'fade',
} as const;