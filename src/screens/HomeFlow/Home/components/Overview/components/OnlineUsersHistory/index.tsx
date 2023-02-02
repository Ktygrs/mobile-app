// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {DEFAULT_FORMAT_LOCALE} from '@constants/formatting';
import {Images} from '@images';
import {CardBase} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {useGetBarGraphDataForStatsPeriod} from '@screens/HomeFlow/Home/components/Overview/components/OnlineUsersHistory/hooks/useGetBarGraphDataForStatsPeriod';
import {VerticalBar} from '@screens/HomeFlow/Home/components/Overview/components/VerticalBar';
import {FriendIcon} from '@svg/FriendIcon';
import {GraphIcon} from '@svg/GraphIcon';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

const USER_GROWTH_STATS_PERIOD = 7;

const Y_AXIS_HEIGHT = '100%';
const BAR_HEIGHT = '90%';
const NUMBER_OF_STEPS_Y = 5;

export const OnlineUsersHistory = () => {
  const {activeUsersData: data} = useGetBarGraphDataForStatsPeriod(
    USER_GROWTH_STATS_PERIOD,
  );

  const maxValue = data.length ? Math.max(...data.map(d => d.value)) : 0;
  const minValue = data.length ? Math.min(...data.map(d => d.value)) : 0;
  const stepValue = data.length ? Math.ceil(maxValue / NUMBER_OF_STEPS_Y) : 0;
  const lastXValue = stepValue * NUMBER_OF_STEPS_Y;
  const totalAdoptionUsers =
    data.reduce((acc, item) => acc + item.value, 0) || 0;

  return (
    <CardBase
      backgroundImageSource={Images.backgrounds.adoptionCardBg}
      headerTitle={t('home.adoption.title')}
      headerTitleIcon={<GraphIcon fill={COLORS.white} />}
      headerValue={totalAdoptionUsers.toLocaleString(DEFAULT_FORMAT_LOCALE)}
      headerValueIcon={<FriendIcon fill={COLORS.shamrock} />}>
      <View style={styles.body}>
        <View style={styles.yAxis}>
          {Array(NUMBER_OF_STEPS_Y)
            .fill('')
            .map((_, i) => {
              const currentValue = stepValue * i ? stepValue * i : minValue;
              return (
                <Text key={i} style={styles.yAxisText}>
                  {formatNumber(currentValue, 1, 'compact')}
                </Text>
              );
            })}
        </View>
        {data.map(item => {
          const valuePercentage = (item.value * 100) / lastXValue;
          return (
            <View style={styles.column} key={item.label}>
              <VerticalBar
                valuePercentage={valuePercentage}
                label={item.label}
              />
            </View>
          );
        })}
      </View>
    </CardBase>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: rem(8),
  },
  column: {
    alignItems: 'center',
    height: BAR_HEIGHT,
  },
  yAxis: {
    height: Y_AXIS_HEIGHT,
    flexDirection: 'column-reverse',
    alignItems: 'center',
    marginBottom: rem(6),
  },
  yAxisText: {
    flex: 1,
    ...font(8, 9.6, 'medium', 'white'),
  },
});
