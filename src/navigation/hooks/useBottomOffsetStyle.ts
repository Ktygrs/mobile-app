// SPDX-License-Identifier: BUSL-1.1

import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {rem} from 'rn-units';

type Params = {
  extraOffset?: number;
};

export const useBottomOffsetStyle = ({extraOffset = rem(0)}: Params = {}) => {
  const {bottom: bottomInset} = useSafeAreaInsets();
  return useMemo(
    () =>
      StyleSheet.create({
        current: {paddingBottom: bottomInset + extraOffset},
      }),
    [extraOffset, bottomInset],
  );
};
