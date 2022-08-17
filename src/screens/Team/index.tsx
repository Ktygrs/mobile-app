// SPDX-License-Identifier: BUSL-1.1

import {KeyboardDismiss} from '@components/KeyboardDismiss';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Header} from '@screens/Team/components/Header';
import {SearchResults} from '@screens/Team/components/SearchResults';
import {SegmentedContent} from '@screens/Team/components/SegmentedContent';
import {isSearchActiveSelector} from '@store/modules/Team/selectors';
import React, {memo, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {isIOS} from 'rn-units';

export const Team = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const [isCountryCodeSearchVisible, setCountryCodeSearchVisibility] =
    useState<boolean>(false);

  const isSearchActive = useSelector(isSearchActiveSelector);

  return (
    <KeyboardDismiss onDismiss={() => setCountryCodeSearchVisibility(false)}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={isIOS ? 'padding' : undefined}>
        <View style={styles.container}>
          <Header isSearchActive={isSearchActive} />
          <View style={commonStyles.baseSubScreen}>
            <SegmentedContent
              showCountriesList={setCountryCodeSearchVisibility}
              isCountriesVisible={isCountryCodeSearchVisible}
            />
            {isSearchActive && <SearchResults />}
          </View>
        </View>
      </KeyboardAvoidingView>
    </KeyboardDismiss>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.primaryLight,
    flex: 1,
  },
});
