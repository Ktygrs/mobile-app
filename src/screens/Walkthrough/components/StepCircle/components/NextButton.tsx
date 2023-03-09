// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {NextArrow} from '@svg/NextArrow';
import {ProgressCircleSvg} from '@svg/ProgressCircle';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  totalSteps: number;
  stepIndex: number;
  onPress: () => void;
};

const CIRCLE_RADIUS = rem(20);
const PROGRESS_WIDTH = rem(3);

export const NextButton = ({totalSteps, stepIndex, onPress}: Props) => {
  const isLastStep = stepIndex === totalSteps - 1;
  return (
    <Touchable
      style={styles.container}
      hitSlop={MIDDLE_BUTTON_HIT_SLOP}
      onPress={onPress}>
      <Text style={styles.labelText}>
        {isLastStep ? t('button.done') : t('button.next_step')}
      </Text>
      {isLastStep ? (
        <NextArrow />
      ) : (
        <View style={styles.progressContainer}>
          <ProgressCircleSvg
            progress={((stepIndex + 1) * 100) / totalSteps}
            strokeWidth={PROGRESS_WIDTH}
            color={COLORS.shamrock}
            radius={CIRCLE_RADIUS - PROGRESS_WIDTH / 2}
            style={styles.progressCircle}
          />
          <NextArrow />
        </View>
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    ...font(17, 21, 'bold'),
    marginRight: rem(12),
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: PROGRESS_WIDTH,
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    borderColor: COLORS.white,
  },
  progressCircle: {
    position: 'absolute',
  },
});