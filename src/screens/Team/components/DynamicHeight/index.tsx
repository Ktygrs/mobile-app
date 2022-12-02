// SPDX-License-Identifier: BUSL-1.1

import {commonStyles, windowHeight} from '@constants/styles';
import BottomSheet from '@gorhom/bottom-sheet';
import useIsKeyboardShown from '@hooks/useIsKeyboardShown';
import {INFO_HEIGHT} from '@screens/Team/components/Header/components/Info';
import {
  SEARCH_HEIGHT,
  SEARCH_INPUT_TOP_OFFSET,
} from '@screens/Team/components/Header/components/Search';
import {SEARCH_RESULTS_OFFSET} from '@screens/Team/components/SearchResults';
import React, {ReactNode, useEffect, useMemo, useRef} from 'react';
import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  isSearchActive: boolean;
};

export const DynamicHeight = ({children, isSearchActive}: Props) => {
  const sheetRef = useRef<BottomSheet>(null);
  const {top: topInset} = useSafeAreaInsets();

  const positions = useMemo(
    () => ({
      expanded: windowHeight - topInset - SEARCH_INPUT_TOP_OFFSET,
      collapsed: windowHeight - topInset - SEARCH_HEIGHT - INFO_HEIGHT,
      search: windowHeight - topInset - SEARCH_HEIGHT - SEARCH_RESULTS_OFFSET,
    }),
    [topInset],
  );

  const snapPoints = useMemo(
    () => [positions.collapsed, positions.expanded],
    [positions],
  );

  const isKeyboardShown = useIsKeyboardShown();

  useEffect(() => {
    /**
     * On Android focusing an input inside the BottomSheet conflicts with native
     * android:windowSoftInputMode="adjustResize" behaviour
     * BottomSheetTextInput + BottomSheet.keyboardBehavior doesn't work either
     * TODO:: try to get rid of the setTimeout hack (try BottomSheet v5 when it's released)
     */
    if (isKeyboardShown && !isSearchActive) {
      if (Platform.OS === 'android') {
        setTimeout(() => sheetRef.current?.snapToIndex(1), 500);
      } else {
        sheetRef.current?.snapToIndex(1);
      }
    }

    if (isSearchActive) {
      sheetRef.current?.snapToPosition(positions.search);
    } else {
      if (Platform.OS === 'android') {
        setTimeout(() => sheetRef.current?.snapToIndex(0), 500);
      } else {
        sheetRef.current?.snapToIndex(0);
      }
    }
  }, [isKeyboardShown, isSearchActive, positions.search]);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      handleComponent={null}
      handleHeight={0}
      animateOnMount={false}
      enableOverDrag={false}
      backgroundStyle={commonStyles.baseSubScreen}
      /**
       * This is required to let child PagerView handle horizontal swipes
       * by not activating BottomSheet's gesture handler for x axis
       * https://github.com/gorhom/react-native-bottom-sheet/issues/770#issuecomment-1072113936
       */
      activeOffsetX={[-1000, 1000]}
      activeOffsetY={[-5, 5]}>
      {children}
    </BottomSheet>
  );
};
