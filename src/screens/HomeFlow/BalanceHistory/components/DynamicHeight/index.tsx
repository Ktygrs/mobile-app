// SPDX-License-Identifier: BUSL-1.1

import {commonStyles, windowHeight} from '@constants/styles';
import BottomSheet from '@gorhom/bottom-sheet';
import {HEADER_HEIGHT} from '@navigation/components/Header';
import {CARD_BODY_TOP_OFFSET} from '@screens/HomeFlow/BalanceHistory/components/CardBody';
import {
  PAGER_HEADER_BUMP_HEIGHT,
  PAGER_HEADER_HEIGHT,
} from '@screens/HomeFlow/BalanceHistory/components/PagerHeader';
import React, {ReactNode, useMemo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
};

export const DynamicHeight = ({children}: Props) => {
  const {top: topInset} = useSafeAreaInsets();

  const positions = useMemo(
    () => ({
      expanded: windowHeight - topInset - HEADER_HEIGHT,
      collapsed:
        windowHeight -
        topInset -
        HEADER_HEIGHT -
        PAGER_HEADER_HEIGHT / 2 -
        PAGER_HEADER_BUMP_HEIGHT -
        CARD_BODY_TOP_OFFSET,
    }),
    [topInset],
  );

  const snapPoints = useMemo(
    () => [positions.collapsed, positions.expanded],
    [positions],
  );

  return (
    <BottomSheet
      snapPoints={snapPoints}
      handleComponent={null}
      handleHeight={0}
      animateOnMount={false}
      enableOverDrag={false}
      backgroundStyle={commonStyles.baseSubScreen}>
      {children}
    </BottomSheet>
  );
};
