// SPDX-License-Identifier: BUSL-1.1

import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Summary} from '@screens/HomeFlow/Stats/components/Summary';
import {TopCountries} from '@screens/HomeFlow/Stats/components/TopCountries';
import {TopMiners} from '@screens/HomeFlow/Stats/components/TopMiners';
import {UsersGrowthGraph} from '@screens/HomeFlow/Stats/components/UsersGrowthGraph';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

export const Stats = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const tabbarOffset = useBottomTabBarOffsetStyle();

  return (
    <View style={styles.container}>
      <LinesBackground />
      <Header
        color={COLORS.white}
        title={t('stats.header_title')}
        backgroundColor={'transparent'}
      />
      <Summary />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tabbarOffset.current}>
        <View style={[styles.card, commonStyles.baseSubScreen]}>
          <UsersGrowthGraph />
          <TopMiners />
          <TopCountries />
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
  card: {
    paddingBottom: 2000,
    marginBottom: -2000,
  },
});
