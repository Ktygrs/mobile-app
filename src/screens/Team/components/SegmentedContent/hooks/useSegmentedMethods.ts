// SPDX-License-Identifier: BUSL-1.1

import {SegmentedControlMethods} from '@components/SegmentedControl';
import {useCallback, useRef, useState} from 'react';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';

export enum SegmentIndex {
  ContactList,
  Tier1List,
  Tier2List,
}

export const useSegmentedMethods = () => {
  const switcherRef = useRef<SegmentedControlMethods>(null);
  const pagerRef = useRef<PagerView>(null);

  const [activeIndex, setActiveIndex] = useState<SegmentIndex>(0);

  const onSegmentedControlChange = useCallback((index: number) => {
    pagerRef.current?.setPage(index);
  }, []);

  const onPageChange = (event: PagerViewOnPageSelectedEvent) => {
    setActiveIndex(event.nativeEvent.position);
    switcherRef.current?.changeSegment(event.nativeEvent.position);
  };

  const setSegmentIndex = useCallback((index: SegmentIndex) => {
    pagerRef.current?.setPage(index);
    switcherRef.current?.changeSegment(index);
    setActiveIndex(index);
  }, []);

  return {
    activeIndex,
    onPageChange,
    onSegmentedControlChange,
    setSegmentIndex,
    switcherRef,
    pagerRef,
  };
};
