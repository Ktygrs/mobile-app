// SPDX-License-Identifier: BUSL-1.1

import {BarGraph} from '@components/BarGraph';
import {LinesBackground} from '@components/LinesBackground';
import {SectionHeader} from '@components/SectionHeader';
import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {HomeTabStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  MOCK_ACTIVE_USERS_GRAPH_DATA,
  MOCK_TOTAL_USERS_GRAPH_DATA,
} from '@screens/HomeFlow/Stats/components/UsersGrowthGraph/mockData';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const UserGrowthGraph = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const tabbarOffest = useBottomTabBarOffsetStyle();

  const {
    params: {category},
  } = useRoute<RouteProp<HomeTabStackParamList, 'UserGrowthGraph'>>();

  return (
    <View style={styles.container}>
      <LinesBackground />
      <Header
        color={COLORS.white}
        title={t('stats.detailed_information')}
        backgroundColor={'transparent'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tabbarOffest.current}>
        <View style={[styles.card, commonStyles.baseSubScreen]}>
          <SectionHeader title={t('stats.user_growth')} />
          <View style={styles.graph}>
            <BarGraph
              data={
                category === 'total'
                  ? MOCK_TOTAL_USERS_GRAPH_DATA
                  : MOCK_ACTIVE_USERS_GRAPH_DATA
              }
            />
          </View>
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
  graph: {
    marginTop: rem(16),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
});
