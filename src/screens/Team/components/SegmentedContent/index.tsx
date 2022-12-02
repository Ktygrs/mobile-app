// SPDX-License-Identifier: BUSL-1.1

import {
  SEGMENTED_CONTROL_HEIGHT,
  SegmentedControl,
  SegmentedControlMethods,
} from '@components/SegmentedControl';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Contacts} from '@screens/Team/components/Contacts';
import {TierList} from '@screens/Team/components/TierList';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {rem} from 'rn-units';

import {SEGMENTS} from './segments';

enum SegmentIndex {
  ContactList,
  Tier1List,
  Tier2List,
}

export const SegmentedContent = memo(() => {
  const [activeIndex, setActiveIndex] = useState<SegmentIndex>(0);
  const switcherRef = useRef<SegmentedControlMethods>(null);
  const pagerRef = useRef<PagerView>(null);

  const onCategoryChange = useCallback((index: number) => {
    pagerRef.current?.setPage(index);
  }, []);

  const onPageChange = (event: PagerViewOnPageSelectedEvent) => {
    setActiveIndex(event.nativeEvent.position);
    switcherRef.current?.changeSegment(event.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      <PagerView
        initialPage={0}
        style={styles.flex}
        ref={pagerRef}
        onPageSelected={onPageChange}>
        <View style={styles.flex}>
          <Contacts focused={activeIndex === SegmentIndex.ContactList} />
        </View>
        <View style={styles.flex}>
          <TierList
            referralType="T1"
            emptyTitle={t('users.referralType.T1')}
            headerTitle="team.tier_one.header_list.title_earnings"
            focused={activeIndex === SegmentIndex.Tier1List}
          />
        </View>
        <View style={styles.flex}>
          <TierList
            referralType="T2"
            emptyTitle={t('users.referralType.T2')}
            headerTitle="team.tier_two.header_list.title_earnings"
            focused={activeIndex === SegmentIndex.Tier2List}
          />
        </View>
      </PagerView>
      <SegmentedControl
        segments={SEGMENTS}
        ref={switcherRef}
        style={styles.tabbar}
        onChange={onCategoryChange}
        initialIndex={0}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: SEGMENTED_CONTROL_HEIGHT + rem(20),
  },
  tabbar: {
    position: 'absolute',
    top: rem(20),
    right: SCREEN_SIDE_OFFSET,
    left: SCREEN_SIDE_OFFSET,
  },
});
