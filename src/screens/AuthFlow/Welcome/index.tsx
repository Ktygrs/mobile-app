// SPDX-License-Identifier: BUSL-1.1

import {ProgressBar} from '@components/ProgressBar';
import {COLORS} from '@constants/colors';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Background} from '@screens/AuthFlow/Welcome/components/Background';
import {Controls} from '@screens/AuthFlow/Welcome/components/Controls';
import {useFinishOnboarding} from '@screens/AuthFlow/Welcome/hooks/useFinishOnboarding';
import {usePager} from '@screens/AuthFlow/Welcome/hooks/usePager';
import {welcomePages} from '@screens/AuthFlow/Welcome/pages';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {rem} from 'rn-units';

import {WelcomeItem} from './components/WelcomeItem';

export const Welcome = () => {
  useFocusStatusBar({style: 'light-content'});

  const {onSubmit, loading} = useFinishOnboarding();
  const {currentPage, goNextPage, onPageSelected, pagerViewRef} = usePager({
    totalPages: welcomePages.length,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Background />

      <ProgressBar
        valuePercentage={(currentPage / (welcomePages.length - 1)) * 100}
        style={styles.progressBar}
      />

      <PagerView
        ref={pagerViewRef}
        style={styles.container}
        initialPage={0}
        onPageSelected={onPageSelected}>
        {welcomePages.map(slide => (
          <View key={slide.key} style={styles.container}>
            <WelcomeItem
              title={slide.title}
              description={slide.description}
              image={slide.image}
            />
          </View>
        ))}
      </PagerView>

      <Controls
        isLastPage={currentPage === welcomePages.length - 1}
        goNextPage={goNextPage}
        finishOnboarding={onSubmit}
      />

      {loading && (
        <ActivityIndicator
          style={[StyleSheet.absoluteFill, styles.loading]}
          size={'large'}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBar: {
    marginLeft: rem(24),
    marginTop: rem(50),
    width: rem(200),
  },
  loading: {
    backgroundColor: COLORS.transparentBackground,
  },
});
