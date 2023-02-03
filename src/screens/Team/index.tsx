// SPDX-License-Identifier: BUSL-1.1

import {LinesBackground} from '@components/LinesBackground';
import {RefreshIceIcon} from '@components/RefreshControl';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {DynamicHeight} from '@screens/Team/components/DynamicHeight';
import {Header} from '@screens/Team/components/Header';
import {SearchResults} from '@screens/Team/components/SearchResults';
import {SegmentedContent} from '@screens/Team/components/SegmentedContent';
import {useOnChangeToCollapsedSnapPoint} from '@screens/Team/hooks/useOnChangeToCollapsedSnapPoint';
import {useOnRefresh} from '@screens/Team/hooks/useOnRefresh';
import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  interpolate,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

export const Team = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const [isSearchActive, setIsSearchActive] = useState(false);

  const animatedIndex = useSharedValue(0);
  const {refreshing} = useOnRefresh(animatedIndex);
  const {addCollapsedSnapPointListener} =
    useOnChangeToCollapsedSnapPoint(animatedIndex);

  const translateY = useDerivedValue(() =>
    interpolate(animatedIndex.value, [0, -0.1], [0, -100]),
  );

  return (
    <View style={styles.container}>
      <LinesBackground />
      <Header
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
      />
      <RefreshIceIcon
        theme={'dark-content'}
        style={styles.refreshIcon}
        refreshing={refreshing}
        translateY={translateY}
      />
      <DynamicHeight
        isSearchActive={isSearchActive}
        animatedIndex={animatedIndex}>
        <SegmentedContent
          addCollapsedSnapPointListener={addCollapsedSnapPointListener}
        />
        {isSearchActive && <SearchResults />}
      </DynamicHeight>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  refreshIcon: {
    position: 'relative',
  },
});
