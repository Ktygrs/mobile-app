// SPDX-License-Identifier: BUSL-1.1

import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Header} from '@screens/Team/components/Header';
import {SearchResults} from '@screens/Team/components/SearchResults';
import {SegmentedContent} from '@screens/Team/components/SegmentedContent';
import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

export const Team = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const [isSearchActive, setSearchActive] = useState(false);

  return (
    <KeyboardAvoider style={styles.container}>
      <Header
        isSearchActive={isSearchActive}
        setSearchActive={setSearchActive}
      />
      <View style={commonStyles.baseSubScreen}>
        <SegmentedContent />
        {isSearchActive && <SearchResults />}
      </View>
    </KeyboardAvoider>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryLight,
    flex: 1,
  },
});
