// SPDX-License-Identifier: BUSL-1.1

import {ProgressBar} from '@components/ProgressBar';
import {COLORS} from '@constants/colors';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Background} from '@screens/WelcomeFlow/Onboarding/components/Background';
import {Controls} from '@screens/WelcomeFlow/Onboarding/components/Controls';
import {OnboardingSlide} from '@screens/WelcomeFlow/Onboarding/components/OnboardingSlide';
import {useFinishOnboarding} from '@screens/WelcomeFlow/Onboarding/hooks/useFinishOnboarding';
import {usePager} from '@screens/WelcomeFlow/Onboarding/hooks/usePager';
import {onboardingSlides} from '@screens/WelcomeFlow/Onboarding/slides';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {rem} from 'rn-units';

export const Onboarding = () => {
  useFocusStatusBar({style: 'light-content'});

  const {onSubmit, loading} = useFinishOnboarding();
  const {currentPage, goNextPage, onPageSelected, pagerViewRef} = usePager({
    totalPages: onboardingSlides.length,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Background />

      <ProgressBar
        valuePercentage={(currentPage / (onboardingSlides.length - 1)) * 100}
        style={styles.progressBar}
      />

      <PagerView
        ref={pagerViewRef}
        style={styles.container}
        initialPage={0}
        onPageSelected={onPageSelected}>
        {onboardingSlides.map(slide => (
          <View key={slide.key} style={styles.container}>
            <OnboardingSlide
              title={slide.title}
              description={slide.description}
              image={slide.image}
            />
          </View>
        ))}
      </PagerView>

      <Controls
        isLastPage={currentPage === onboardingSlides.length - 1}
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
