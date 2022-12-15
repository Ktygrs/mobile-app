// SPDX-License-Identifier: BUSL-1.1

import {
  DEFAULT_CONTAINER_MARGIN,
  SEGMENTED_CONTROL_HEIGHT,
  SegmentedControl,
  SegmentedControlMethods,
  styles as segmentedControlStyles,
} from '@components/SegmentedControl';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {WalkThroughContext} from '@contexts/WalkThroughContext';
import {Contacts} from '@screens/Team/components/Contacts';
import {INFO_HEIGHT} from '@screens/Team/components/Header/components/Info';
import {SEARCH_HEIGHT} from '@screens/Team/components/Header/components/Search';
import {TierList} from '@screens/Team/components/TierList';
import {Indicator} from '@svg/Indicator';
import {t} from '@translations/i18n';
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {rem} from 'rn-units';
import {screenWidth} from 'rn-units/index';

import {SegmentData, SEGMENTS} from './segments';

enum SegmentIndex {
  ContactList,
  Tier1List,
  Tier2List,
}

const SEGMENTED_CONTROL_PADDING_TOP = rem(20);
const CONTAINER_PADDING_TOP =
  SEGMENTED_CONTROL_HEIGHT + SEGMENTED_CONTROL_PADDING_TOP;
const BORDER_RADIUS = 20;

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

  const {top: topInset} = useSafeAreaInsets();
  const offset = topInset + SEARCH_HEIGHT + INFO_HEIGHT + CONTAINER_PADDING_TOP;

  const {addStepData} = useContext(WalkThroughContext);
  useEffect(() => {
    const top = offset - SEGMENTED_CONTROL_HEIGHT;
    const widthStyle = {width: `${100 / SEGMENTS.length}%`};
    const stepOffset = 4;
    SEGMENTS.forEach((segmentData: SegmentData, index: number) => {
      const step = stepOffset + index;
      const sectionWidth =
        screenWidth - SCREEN_SIDE_OFFSET * 2 - DEFAULT_CONTAINER_MARGIN * 2;
      const leftStyle = {left: (sectionWidth / SEGMENTS.length) * index};
      addStepData({
        step,
        stepData: {
          version: 1,
          top,
          icon: segmentData.renderIcon(false),
          onNext: () => {
            if (index < SEGMENTS.length - 1) {
              onCategoryChange(index + 1);
            } else {
              onCategoryChange(1);
            }
          },
          renderStepHighlight: () => (
            <View style={[styles.walkthroughElementContainer, {top}]}>
              <View
                style={[
                  styles.walkthroughElementInnerContainer,
                  widthStyle,
                  leftStyle,
                ]}>
                <Animated.View
                  style={[segmentedControlStyles.indicator, styles.indicator]}>
                  <Indicator
                    width={'100%'}
                    height={'100%'}
                    preserveAspectRatio="none"
                  />
                </Animated.View>
                {segmentData.renderText(true)}
              </View>
            </View>
          ),
        },
      });
    });
  }, [addStepData, offset, onCategoryChange]);

  return (
    <View style={styles.container}>
      <PagerView
        initialPage={0}
        style={styles.flex}
        ref={pagerRef}
        onPageSelected={onPageChange}>
        <View style={styles.flex}>
          <Contacts
            offset={offset}
            focused={activeIndex === SegmentIndex.ContactList}
          />
        </View>
        <View style={styles.flex}>
          <TierList
            referralType="T1"
            offset={offset}
            emptyTitle={t('users.referralType.T1')}
            headerTitle={t('team.tier_one.header_list.title_earnings')}
            focused={activeIndex === SegmentIndex.Tier1List}
          />
        </View>
        <View style={styles.flex}>
          <TierList
            referralType="T2"
            offset={offset}
            emptyTitle={t('users.referralType.T2')}
            headerTitle={t('team.tier_two.header_list.title_earnings')}
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
    paddingTop: CONTAINER_PADDING_TOP,
  },
  tabbar: {
    position: 'absolute',
    top: SEGMENTED_CONTROL_PADDING_TOP,
    right: SCREEN_SIDE_OFFSET,
    left: SCREEN_SIDE_OFFSET,
  },
  walkthroughElementContainer: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white02opacity,
    paddingHorizontal: DEFAULT_CONTAINER_MARGIN,
  },
  walkthroughElementInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: SEGMENTED_CONTROL_HEIGHT,
  },
  indicator: {
    width: '100%',
  },
});
