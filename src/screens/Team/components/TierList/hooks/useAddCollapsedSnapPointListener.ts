// SPDX-License-Identifier: BUSL-1.1

import {ReferralType} from '@api/user/types';
import {BottomSheetFlatListMethods} from '@gorhom/bottom-sheet';
import {useEffect, useRef} from 'react';

export const useAddCollapsedSnapPointListener = ({
  addListener,
  referralType,
}: {
  addListener: (key: string, addListener: () => void) => void;
  referralType: ReferralType;
}) => {
  const bottomSheetRef = useRef<BottomSheetFlatListMethods>(null);
  useEffect(() => {
    addListener(referralType, () => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.scrollToOffset({animated: true, offset: 0});
      }
    });
  }, [bottomSheetRef, addListener, referralType]);
  return {bottomSheetRef};
};
