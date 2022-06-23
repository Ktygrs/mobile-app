// SPDX-License-Identifier: BUSL-1.1

import {CheckBox} from '@components/CheckBox';
import {Slider} from '@components/Slider';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {MiningIcon} from '@svg/MiningIcon';
import {TierOneIcon} from '@svg/TierOneIcon';
import {TierTwoIcon} from '@svg/TierTwoIcon';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/number';
import React, {memo, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {font, rem} from 'rn-units';

const TIER_ONE_MAX = 30;
const TIER_ONE_DEFAULT = 10;
const TIER_TWO_MAX = 20;
const TIER_TWO_DEFAULT = 15;

type Props = {
  onCalculateResult: (data: {
    activeInviter: boolean;
    tierOneValue: number;
    tierTwoValue: number;
  }) => void;
  result: number | null;
  loading: boolean;
};

export const Calculator = memo(
  ({result, onCalculateResult, loading}: Props) => {
    const tierOneElementRef = useRef<TextInput | null>(null);
    const tierTwoElementRef = useRef<TextInput | null>(null);
    const tierOneValueRef = useRef(TIER_ONE_DEFAULT);
    const tierTwoValueRef = useRef(TIER_TWO_DEFAULT);

    const [activeInviter, setActiveInviter] = useState(true);

    const calculateResult = () => {
      onCalculateResult({
        activeInviter,
        tierOneValue: tierOneValueRef.current,
        tierTwoValue: tierTwoValueRef.current,
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(calculateResult, [activeInviter]);

    return (
      <View style={[styles.containder, commonStyles.shadow]}>
        <Text style={styles.resultLabelText}>
          {t('mining_calculator.result_label')}:
        </Text>
        <View style={styles.resultValue}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.resultValueText}>
              {result !== null
                ? `${formatNumber(result)} ${t('mining_calculator.currency')}`
                : null}
            </Text>
          )}
        </View>
        <View style={styles.checkboxWrapper}>
          <CheckBox
            value={activeInviter}
            onValueChange={setActiveInviter}
            LabelComponent={
              <View style={styles.checkboxLabel}>
                <MiningIcon />
                <Text style={styles.checkboxLabelText}>
                  {t('mining_calculator.active_inviter')}
                </Text>
              </View>
            }
          />
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
          minimumValue={useSharedValue(0)}
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
          minimumValue={useSharedValue(0)}
          maximumValue={useSharedValue(TIER_TWO_MAX)}
          step={TIER_TWO_MAX}
          onValueChange={value => {
            tierTwoValueRef.current = value;
            tierTwoElementRef.current?.setNativeProps({text: value.toString()});
          }}
          onSlidingComplete={calculateResult}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  containder: {
    marginTop: rem(12),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    paddingRight: rem(42),
    paddingLeft: rem(36),
    borderRadius: rem(15),
    backgroundColor: COLORS.persianBlue,
    paddingBottom: rem(42),
  },
  resultLabelText: {
    fontSize: font(13),
    lineHeight: font(24),
    fontFamily: FONTS.primary.regular,
    color: COLORS.periwinkleGray,
    marginTop: rem(34),
    textAlign: 'center',
  },
  resultValue: {
    height: rem(26),
    alignItems: 'center',
  },
  resultValueText: {
    fontSize: font(22),
    lineHeight: font(26),
    fontFamily: FONTS.primary.bold,
    color: COLORS.white,
    textAlign: 'center',
  },
  checkboxWrapper: {
    paddingTop: rem(28),
  },
  checkboxLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabelText: {
    fontSize: font(13),
    lineHeight: font(24),
    fontFamily: FONTS.primary.regular,
    color: COLORS.white,
  },
  sliderInfo: {
    marginTop: Platform.OS === 'android' ? rem(17) : rem(27),
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    marginTop: Platform.OS === 'android' ? rem(3) : rem(10),
    marginLeft: rem(6),
  },
  sliderLabelText: {
    fontSize: font(13),
    lineHeight: font(24),
    fontFamily: FONTS.primary.regular,
    color: COLORS.white,
  },
  sliderValueText: {
    flex: 1,
    fontSize: font(13),
    fontFamily: FONTS.primary.bold,
    color: COLORS.periwinkleGray,
    textAlign: 'right',
  },
});