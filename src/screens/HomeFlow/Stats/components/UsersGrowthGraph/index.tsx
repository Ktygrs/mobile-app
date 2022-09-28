// SPDX-License-Identifier: BUSL-1.1

import {BarGraph, getBarGraphHeight} from '@components/BarGraph';
import {SectionHeader} from '@components/SectionHeader';
import {
  SegmentedControl,
  SegmentedControlMethods,
} from '@components/SegmentedControl';
import {HomeTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PeriodSelect} from '@screens/HomeFlow/Stats/components/UsersGrowthGraph/components/PeriodSelect';
import {
  MOCK_ACTIVE_USERS_GRAPH_DATA,
  MOCK_TOTAL_USERS_GRAPH_DATA,
} from '@screens/HomeFlow/Stats/components/UsersGrowthGraph/mockData';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {rem} from 'rn-units';

type GraphCategory = 'total' | 'active';

export const SEGMENTS: ReadonlyArray<{text: string; key: GraphCategory}> = [
  {text: t('stats.total'), key: 'total'},
  {text: t('stats.active'), key: 'active'},
];

const PERIODS = [
  {label: t('periods.3_days'), length: 3},
  {label: t('periods.7_days'), length: 7},
  {label: t('periods.30_days'), length: 30, redirect: true},
];

export const UsersGrowthGraph = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabStackParamList>>();
  const switcherRef = useRef<SegmentedControlMethods>(null);
  const pagerRef = useRef<PagerView>(null);
  const segmentRef = useRef(SEGMENTS[0]);
  const [periodIndex, setPeriodIndex] = useState(1);
  const period = PERIODS[periodIndex];

  const onSegmentChange = useCallback((index: number) => {
    segmentRef.current = SEGMENTS[index];
    pagerRef.current?.setPage(index);
  }, []);

  const onPageChange = (event: PagerViewOnPageSelectedEvent) => {
    const index = event.nativeEvent.position;
    segmentRef.current = SEGMENTS[index];
    switcherRef.current?.changeSegment(index);
  };

  const onPeriodChange = (index: number) => {
    if (PERIODS[index].redirect) {
      navigation.navigate('UserGrowthGraph', {
        category: segmentRef.current.key,
      });
    } else {
      setPeriodIndex(index);
    }
  };

  return (
    <View>
      <SegmentedControl
        segments={SEGMENTS}
        ref={switcherRef}
        onChange={onSegmentChange}
        style={styles.segmentSwitcher}
      />
      <SectionHeader
        title={t('stats.user_growth')}
        action={
          <PeriodSelect
            selectedIndex={periodIndex}
            options={PERIODS}
            onChange={onPeriodChange}
          />
        }
      />
      <PagerView
        initialPage={0}
        style={[
          styles.segmentPager,
          {height: getBarGraphHeight(period.length)},
        ]}
        ref={pagerRef}
        onPageSelected={onPageChange}>
        <View style={styles.segmentSlide}>
          <BarGraph
            data={MOCK_TOTAL_USERS_GRAPH_DATA.slice(0, period.length)}
          />
        </View>
        <View style={styles.segmentSlide}>
          <BarGraph
            data={MOCK_ACTIVE_USERS_GRAPH_DATA.slice(0, period.length)}
          />
        </View>
      </PagerView>
    </View>
  );
});

const styles = StyleSheet.create({
  segmentSwitcher: {
    marginTop: rem(20),
    marginHorizontal: rem(20),
  },
  sectionHeaderChevron: {
    transform: [{rotate: '180deg'}],
    marginLeft: rem(6),
    marginBottom: rem(8),
  },
  segmentPager: {
    marginTop: rem(12),
  },
  segmentSlide: {
    paddingHorizontal: rem(20),
  },
});
