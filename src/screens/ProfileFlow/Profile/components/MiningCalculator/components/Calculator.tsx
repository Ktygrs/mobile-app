// SPDX-License-Identifier: BUSL-1.1

import {Slider} from '@components/Slider';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {MiningIcon} from '@svg/MiningIcon';
import {TierOneIcon} from '@svg/TierOneIcon';
import {TierTwoIcon} from '@svg/TierTwoIcon';
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

const TIER_ONE_MIN = 0;
const TIER_ONE_MAX = 30;
const TIER_ONE_DEFAULT = 10;
const TIER_TWO_MIN = 0;
const TIER_TWO_MAX = 20;
const TIER_TWO_DEFAULT = 15;
const ACTIVE_MINERS_MIN = 0;
const ACTIVE_MINERS_MAX = 100;
const ACTIVE_MINERS_DEFAULT = 30;

type Props = {
  onCalculateResult: (data: {
    tierOneValue: number;
    tierTwoValue: number;
    activeMinersPerc: number;
  }) => void;
  result: number | null;
  loading: boolean;
};

export const Calculator = memo(
  ({result, onCalculateResult, loading}: Props) => {
    const tierOneElementRef = useRef<TextInput | null>(null);
    const tierTwoElementRef = useRef<TextInput | null>(null);
    const activeMinersElementRef = useRef<TextInput | null>(null);
    const tierOneValueRef = useRef(TIER_ONE_DEFAULT);
    const tierTwoValueRef = useRef(TIER_TWO_DEFAULT);
    const activeMinersValueRef = useRef(ACTIVE_MINERS_DEFAULT);

    const calculateResult = () => {
      onCalculateResult({
        tierOneValue: tierOneValueRef.current,
        tierTwoValue: tierTwoValueRef.current,
        activeMinersPerc: activeMinersValueRef.current,
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(calculateResult, []);

    return (
      <View style={[styles.container, commonStyles.shadow]}>
        <Text style={styles.resultLabelText}>
          {t('mining_calculator.result_label')}:
        </Text>
        <View style={styles.resultValue}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.resultValueText}>
              {result !== null
                ? `${result} ${t('mining_calculator.currency')}`
                : null}
            </Text>
          )}
        </View>
        <View style={styles.sliderInfo}>
          <TierOneIcon />
          <Text style={styles.sliderLabelText}>
            {t('mining_calculator.tier_1_ref')}
          </Text>
          <TextInput
            style={styles.sliderValueText}
            ref={tierOneElementRef}
            editable={false}
            defaultValue={tierOneValueRef.current.toString()}
          />
        </View>
        <Slider
          style={styles.slider}
          progress={useSharedValue(TIER_ONE_DEFAULT)}
          minimumValue={useSharedValue(TIER_ONE_MIN)}
          maximumValue={useSharedValue(TIER_ONE_MAX)}
          step={TIER_ONE_MAX}
          onValueChange={value => {
            tierOneValueRef.current = value;
            tierOneElementRef.current?.setNativeProps({text: value.toString()});
          }}
          onSlidingComplete={calculateResult}
        />
        <View style={styles.sliderInfo}>
          <TierTwoIcon />
          <Text style={styles.sliderLabelText}>
            {t('mining_calculator.tier_2_ref')}
          </Text>
          <TextInput
            style={styles.sliderValueText}
            ref={tierTwoElementRef}
            editable={false}
            defaultValue={tierTwoValueRef.current.toString()}
          />
        </View>
        <Slider
          style={styles.slider}
          progress={useSharedValue(TIER_TWO_DEFAULT)}
          minimumValue={useSharedValue(TIER_TWO_MIN)}
          maximumValue={useSharedValue(TIER_TWO_MAX)}
          step={TIER_TWO_MAX}
          onValueChange={value => {
            tierTwoValueRef.current = value;
            tierTwoElementRef.current?.setNativeProps({text: value.toString()});
          }}
          onSlidingComplete={calculateResult}
        />
        <View style={styles.sliderInfo}>
          <MiningIcon />
          <Text style={styles.sliderLabelText}>
            {t('mining_calculator.active_miners')}
          </Text>
          <TextInput
            style={styles.sliderValueText}
            ref={activeMinersElementRef}
            editable={false}
            defaultValue={`${activeMinersValueRef.current}%`}
          />
        </View>
        <Slider
          style={styles.slider}
          progress={useSharedValue(ACTIVE_MINERS_DEFAULT)}
          minimumValue={useSharedValue(ACTIVE_MINERS_MIN)}
          maximumValue={useSharedValue(ACTIVE_MINERS_MAX)}
          step={ACTIVE_MINERS_MAX}
          onValueChange={value => {
            activeMinersValueRef.current = Math.round(value); // https://0.30000000000000004.com/
            activeMinersElementRef.current?.setNativeProps({
              text: `${activeMinersValueRef.current}%`,
            });
          }}
          onSlidingComplete={calculateResult}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginTop: rem(12),
    marginHorizontal: 16,
    paddingHorizontal: rem(20),
    borderRadius: rem(20),
    backgroundColor: COLORS.primaryDark,
    paddingBottom: rem(42),
  },
  resultLabelText: {
    marginTop: rem(28),
    textAlign: 'center',
    ...font(13, 24, 'regular', 'periwinkleGray'),
  },
  resultValue: {
    height: rem(32),
    alignItems: 'center',
  },
  resultValueText: {
    textAlign: 'center',
    paddingTop: rem(6),
    ...font(28, 33.6, 'bold'),
  },
  checkboxWrapper: {
    paddingTop: rem(28),
  },
  checkboxLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabelText: {
    ...font(13, 24, 'regular'),
  },
  sliderInfo: {
    marginTop: isAndroid ? rem(17) : rem(34),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rem(8),
  },
  slider: {
    marginTop: rem(3),
    marginLeft: rem(6),
    marginBottom: rem(6),
  },
  sliderLabelText: {
    ...font(13, 24, 'regular', 'periwinkleGray'),
  },
  sliderValueText: {
    flex: 1,
    textAlign: 'right',
    ...font(17, 24, 'bold'),
  },
});
