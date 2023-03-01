// SPDX-License-Identifier: BUSL-1.1

import {BottomSheetSectionListMethods} from '@gorhom/bottom-sheet';
import {AGENDA} from '@screens/Team/constants';
import {useEffect, useRef} from 'react';

export const useAddCollapsedSnapPointListener = ({
  addListener,
  hasSections,
}: {
  addListener: (key: string, addListener: () => void) => void;
  hasSections: boolean;
}) => {
  const bottomSheetRef = useRef<BottomSheetSectionListMethods>(null);
  useEffect(() => {
    addListener(AGENDA, () => {
      if (bottomSheetRef.current && hasSections) {
        bottomSheetRef.current.scrollToLocation({
          animated: true,
          itemIndex: 0,
          sectionIndex: 0,
        });
      }
    });
  }, [bottomSheetRef, addListener, hasSections]);
  return {bottomSheetRef};
};
