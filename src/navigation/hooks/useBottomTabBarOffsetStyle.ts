// SPDX-License-Identifier: BUSL-1.1

import {BottomTabBarHeightContext} from '@react-navigation/bottom-tabs';
import {useContext, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Params = {
  extraOffset?: number;
};

export const useBottomTabBarOffsetStyle = ({extraOffset}: Params = {}) => {
  const tabBarHeight = useContext(BottomTabBarHeightContext) ?? 0;
  const extraPadding = extraOffset ?? (tabBarHeight ? rem(64) : rem(16));
  return useMemo(
    () =>
      StyleSheet.create({
        current: {
          paddingBottom: tabBarHeight + extraPadding,
        },
      }),
    [tabBarHeight, extraPadding],
  );
};
