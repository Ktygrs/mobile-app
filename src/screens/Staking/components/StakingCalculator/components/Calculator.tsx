// SPDX-License-Identifier: BUSL-1.1

import {IceLabel} from '@components/Labels/IceLabel';
import {Slider} from '@components/Slider';
import {COLORS} from '@constants/colors';
import {
  DEFAULT_STAKING_YEARS,
  MAX_STAKING_YEARS,
  MIN_STAKING_YEARS,
  STACKING_ALLOCATION_DEFAULT,
  STACKING_ALLOCATION_MAX,
  STACKING_ALLOCATION_MIN,
} from '@constants/staking';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {ChartIcon} from '@svg/ChartIcon';
import {YearsIcon} from '@svg/YearsIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {isAndroid, rem} from 'rn-units';

type Props = {
  onCalculateResult: (data: {years: number; allocation: number}) => void;
  result: number | null;
  loading: boolean;
};

export const Calculator = memo(
  ({result, onCalculateResult, loading}: Props) => {
    const yearsElementRef = useRef<TextInput | null>(null);
    const allocationElementRef = useRef<TextInput | null>(null);
    const yearsValueRef = useRef(DEFAULT_STAKING_YEARS);
    const allocationValueRef = useRef(STACKING_ALLOCATION_DEFAULT);

    const calculateResult = () => {
      onCalculateResult({
        years: yearsValueRef.current,
        allocation: allocationValueRef.current,
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(calculateResult, []);

    return (
      <View style={[styles.containder, commonStyles.shadow]}>
        <Text style={styles.resultLabelText}>
          {t('mining_calculator.result_label')}:
        </Text>
        <View style={styles.resultValue}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={styles.resultValueText}
              // with numberOfLines on android the IceLabel is not displayed
              // and on Android adjustsFontSizeToFit works even without numberOfLines
              numberOfLines={isAndroid ? undefined : 1}
              adjustsFontSizeToFit>
              {result != null && (
                <>
                  {result}{' '}
                  <IceLabel
                    iconSize={26}
                    iconOffsetY={isAndroid ? 3 : 0}
                    label={t('general.ice_per_hour')}
                  />
                  <Text style={styles.resultValueText_bonus}> (+145%)</Text>
                </>
              )}
            </Text>
          )}
        </View>
        <Text style={styles.currentRateText}>
          {t('staking.current_rate').toUpperCase()}: 7,120{' '}
          <IceLabel iconSize={14} label={t('general.ice_per_hour')} />
        </Text>
        <View style={styles.sliderInfo}>
          <YearsIcon
            color={COLORS.periwinkleGray}
            width={rem(22)}
            height={rem(22)}
          />
          <Text style={styles.sliderLabelText}>{t('global.years')}</Text>
          <TextInput
            style={styles.sliderValueText}
            ref={yearsElementRef}
            editable={false}
            defaultValue={yearsValueRef.current.toString()}
          />
        </View>
        <Slider
          style={styles.slider}
          progress={useSharedValue(DEFAULT_STAKING_YEARS)}
          minimumValue={useSharedValue(MIN_STAKING_YEARS)}
          maximumValue={useSharedValue(MAX_STAKING_YEARS)}
          step={MAX_STAKING_YEARS - MIN_STAKING_YEARS}
          onValueChange={value => {
            yearsValueRef.current = value;
            yearsElementRef.current?.setNativeProps({text: value.toString()});
          }}
          onSlidingComplete={calculateResult}
        />
        <View style={styles.sliderInfo}>
          <ChartIcon
            color={COLORS.periwinkleGray}
            width={rem(23)}
            height={rem(24)}
          />
          <Text style={styles.sliderLabelText}>{t('staking.allocation')}</Text>
          <TextInput
            style={styles.sliderValueText}
            ref={allocationElementRef}
            editable={false}
            defaultValue={`${allocationValueRef.current}%`}
          />
        </View>
        <Slider
          style={styles.slider}
          progress={useSharedValue(STACKING_ALLOCATION_DEFAULT)}
          minimumValue={useSharedValue(STACKING_ALLOCATION_MIN)}
          maximumValue={useSharedValue(STACKING_ALLOCATION_MAX)}
          step={STACKING_ALLOCATION_MAX - STACKING_ALLOCATION_MIN}
          onValueChange={value => {
            allocationValueRef.current = Math.round(value); // https://0.30000000000000004.com/
            allocationElementRef.current?.setNativeProps({
              text: `${allocationValueRef.current}%`,
            });
          }}
          onSlidingComplete={calculateResult}
        />
        <Text style={styles.descriptionText}>{t('staking.description')}</Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  containder: {
    marginTop: -rem(82),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    paddingHorizontal: rem(16),
    borderRadius: rem(20),
    backgroundColor: COLORS.madison,
    paddingBottom: rem(30),
  },
  resultLabelText: {
    marginTop: rem(30),
    textAlign: 'center',
    ...font(13, 24, 'regular', 'periwinkleGray'),
  },
  resultValue: {
    height: rem(36),
    justifyContent: 'center',
  },
  resultValueText: {
    textAlign: 'center',
    ...font(28, 34, 'bold'),
  },
  resultValueText_bonus: {
    color: COLORS.shamrock,
  },
  currentRateText: {
    textAlign: 'center',
    marginVertical: rem(4),
    ...font(13, 18, 'bold', 'periwinkleGray'),
  },
  sliderInfo: {
    marginTop: rem(30),
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    marginTop: rem(10),
  },
  sliderLabelText: {
    ...font(13, 24, 'regular', 'periwinkleGray'),
  },
  sliderValueText: {
    flex: 1,
    textAlign: 'right',
    ...font(17, 24, 'bold'),
  },
  descriptionText: {
    marginTop: rem(40),
    textAlign: 'center',
    ...font(14, 19, 'regular', 'periwinkleGray'),
  },
});
