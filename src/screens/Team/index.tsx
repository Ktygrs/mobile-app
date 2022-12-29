// SPDX-License-Identifier: BUSL-1.1

import {LinesBackground} from '@components/LinesBackground';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {DynamicHeight} from '@screens/Team/components/DynamicHeight';
import {Header} from '@screens/Team/components/Header';
import {SearchResults} from '@screens/Team/components/SearchResults';
import {SegmentedContent} from '@screens/Team/components/SegmentedContent';
import {useShowWalkThrough} from '@screens/WalkThrough/hooks/useShowWalkThrough';
import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

export const Team = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const [isSearchActive, setIsSearchActive] = useState(false);
  useShowWalkThrough({walkThroughType: 'team'});
  return (
    <View style={styles.container}>
      <LinesBackground />
      <Header
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
      />
      <DynamicHeight isSearchActive={isSearchActive}>
        <SegmentedContent />
        {isSearchActive && <SearchResults />}
      </DynamicHeight>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
