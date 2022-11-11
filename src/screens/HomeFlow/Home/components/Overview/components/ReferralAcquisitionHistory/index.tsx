// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {CardBase} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {Tiers} from '@screens/HomeFlow/Home/components/Overview/components/ReferralAcquisitionHistory/components/Tiers';
import {UnitedVerticalBar} from '@screens/HomeFlow/Home/components/Overview/components/UnitedVerticalBar';
import {userSelector} from '@store/modules/Account/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralHistorySelector} from '@store/modules/Referrals/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {TrophyIcon} from '@svg/TrophyIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import dayjs from 'dayjs';
import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

const NUMBER_OF_STEPS_Y = 5;
const Y_AXIS_HEIGHT = '100%';

export const ReferralAcquisitionHistory = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  useEffect(() => {
    dispatch(ReferralsActions.GET_REFERRALS_HISTORY.START.create());
  }, [dispatch, user]);

  const isLoading = useSelector(
    isLoadingSelector.bind(null, ReferralsActions.GET_REFERRALS_HISTORY),
  );

  const referralHistory = useSelector(referralHistorySelector);

  const maxTierOneRefValue = Math.max(...referralHistory.map(tier => tier.t1));
  const maxTierTwoRefValue = Math.max(...referralHistory.map(tier => tier.t2));

  const maxValue =
    maxTierOneRefValue > maxTierTwoRefValue
      ? maxTierOneRefValue
      : maxTierTwoRefValue;
  const stepValue = Math.ceil(maxValue / NUMBER_OF_STEPS_Y);
  const lastXValue = stepValue * NUMBER_OF_STEPS_Y;

  const getLabel = (date: string) => {
    return dayjs(date).format('DD/MM');
  };

  return (
    <CardBase
      backgroundImageSource={Images.backgrounds.referralsCardBg}
      headerTitle={t('home.referrals.title')}
      headerTitleIcon={<TrophyIcon fill={COLORS.white} />}
      headerValueIcon={<Tiers />}>
      {isLoading ? (
        <ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
      ) : (
        <View style={styles.body}>
          <View style={styles.yAxis}>
            {Array(NUMBER_OF_STEPS_Y)
              .fill('')
              .map((_, i) => {
                const currentValue = i === 0 ? stepValue : stepValue * (i + 1);
                return (
                  <Text key={i} style={styles.yAxisText}>
                    {currentValue}
                  </Text>
                );
              })}
          </View>
          {referralHistory.map(item => {
            const valuePercentageL1 = (item.t1 * 100) / lastXValue;
            const valuePercentageL2 = (item.t2 * 100) / lastXValue;
            const label = getLabel(item.date);
            return (
              <View style={styles.column} key={item.date}>
                <UnitedVerticalBar
                  valuePercentageB1={valuePercentageL1}
                  valuePercentageB2={valuePercentageL2}
                  label={label}
                />
              </View>
            );
          })}
        </View>
      )}
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
  },
  yAxis: {
    height: Y_AXIS_HEIGHT,
    flexDirection: 'column-reverse',
    alignItems: 'center',
    marginBottom: rem(8),
    justifyContent: 'space-around',
  },
  yAxisText: {
    ...font(8, 9.6, 'medium', 'white'),
  },
});
