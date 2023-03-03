// SPDX-License-Identifier: BUSL-1.1

import {
  SEGMENTED_CONTROL_HEIGHT,
  SegmentedControl,
} from '@components/SegmentedControl';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {TeamTabStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Contacts} from '@screens/Team/components/Contacts';
import {useSegmentedControlWalkthrough} from '@screens/Team/components/SegmentedContent/hooks/useSegmentedControlWalkthrough';
import {
  SegmentIndex,
  useSegmentedMethods,
} from '@screens/Team/components/SegmentedContent/hooks/useSegmentedMethods';
import {TierList} from '@screens/Team/components/TierList';
import {Listener} from '@screens/Team/types';
import {t} from '@translations/i18n';
import React, {memo, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {rem} from 'rn-units';

import {SEGMENTS} from './segments';

type Props = {
  addCollapsedSnapPointListener: (key: string, listener: Listener) => void;
};

export const SEGMENTED_CONTROL_PADDING_TOP = rem(20);
export const CONTAINER_PADDING_TOP =
  SEGMENTED_CONTROL_HEIGHT + SEGMENTED_CONTROL_PADDING_TOP;

export const SegmentedContent = memo(
  ({addCollapsedSnapPointListener}: Props) => {
    const route = useRoute<RouteProp<TeamTabStackParamList, 'Team'>>();
    const initialIndex = useRef(route.params?.segmentIndex);

    const {
      activeIndex,
      setSegmentIndex,
      onPageChange,
      onSegmentedControlChange,
      switcherRef,
      pagerRef,
    } = useSegmentedMethods();

    const {
      elementRef: segmentedControlRef,
      onElementLayout: onSegmentedControlLayout,
    } = useSegmentedControlWalkthrough();

    useEffect(() => {
      const routeSegmentIndex = route.params?.segmentIndex;
      if (routeSegmentIndex && initialIndex.current !== routeSegmentIndex) {
        setSegmentIndex(routeSegmentIndex);
      }
    }, [route.params?.segmentIndex, setSegmentIndex]);

    return (
      <View style={styles.container}>
        <PagerView
          initialPage={initialIndex.current}
          style={styles.flex}
          ref={pagerRef}
          onPageSelected={onPageChange}>
          <View style={styles.flex}>
            <Contacts
              focused={activeIndex === SegmentIndex.ContactList}
              addCollapsedSnapPointListener={addCollapsedSnapPointListener}
            />
          </View>
          <View style={styles.flex}>
            <TierList
              referralType="T1"
              emptyTitle={t('users.referralType.T1')}
              focused={activeIndex === SegmentIndex.Tier1List}
              addCollapsedSnapPointListener={addCollapsedSnapPointListener}
            />
          </View>
          <View style={styles.flex}>
            <TierList
              referralType="T2"
              emptyTitle={t('users.referralType.T2')}
              focused={activeIndex === SegmentIndex.Tier2List}
              addCollapsedSnapPointListener={addCollapsedSnapPointListener}
            />
          </View>
        </PagerView>
        <View
          ref={segmentedControlRef}
          onLayout={onSegmentedControlLayout}
          style={styles.tabbar}>
          <SegmentedControl
            segments={SEGMENTS}
            ref={switcherRef}
            onChange={onSegmentedControlChange}
            initialIndex={initialIndex.current}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: CONTAINER_PADDING_TOP,
  },
  tabbar: {
    position: 'absolute',
    top: SEGMENTED_CONTROL_PADDING_TOP,
    right: SCREEN_SIDE_OFFSET,
    left: SCREEN_SIDE_OFFSET,
  },
});
