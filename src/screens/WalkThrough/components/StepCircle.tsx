// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {Images} from '@images';
import {
  CIRCLE_DIAMETER,
  CIRCLE_PADDING_VERTICAL,
} from '@screens/WalkThrough/constants';
import {useCirclePosition} from '@screens/WalkThrough/hooks/useCirclePosition';
import {useParseDescription} from '@screens/WalkThrough/hooks/useParseDescription';
import {WalkThroughStep} from '@store/modules/WalkThrough/types';
import {NextArrowSvg} from '@svg/NextArrow';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import Animated, {AnimatedStyleProp} from 'react-native-reanimated';
import {rem, screenWidth} from 'rn-units';

const ICON_CONTAINER_SIZE = rem(32);

type Props = {
  step: WalkThroughStep;
  totalSteps: number;
  stepIndex: number;
  elementHeight: number | undefined;
  onNext: () => void;
  animatedStyle?: AnimatedStyleProp<ViewStyle>;
};

export const StepCircle = ({
  step,
  totalSteps,
  stepIndex,
  elementHeight,
  onNext,
  animatedStyle,
}: Props) => {
  const isLastStep = stepIndex === totalSteps - 1;

  const circlePosition = useCirclePosition({
    elementHeight,
    elementData: step.elementData,
  });

  const {parsedDescription} = useParseDescription({step});

  return (
    <Animated.View
      style={[styles.circleContainer, animatedStyle, {top: circlePosition}]}>
      <Image
        source={Images.backgrounds.walkthroughBg}
        style={styles.backgroundImage}
      />
      <View>
        <View style={styles.row}>
          <View style={styles.titleContainer}>
            {step.Icon ? (
              <View style={styles.iconContainer}>{step.Icon}</View>
            ) : null}
            <Text style={styles.title}>{step.title}</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressIndicator,
                {width: `${(stepIndex / totalSteps) * 100}%`},
              ]}
            />
          </View>
        </View>
        <Text style={styles.description}>{parsedDescription}</Text>
      </View>
      <View style={styles.row}>
        <Touchable onPress={() => false} hitSlop={MIDDLE_BUTTON_HIT_SLOP}>
          <Text style={styles.skipAll}>{t('button.skip_all')}</Text>
        </Touchable>
        <Touchable
          style={styles.nextContainer}
          hitSlop={MIDDLE_BUTTON_HIT_SLOP}
          onPress={onNext}>
          <Text style={styles.next}>
            {isLastStep ? t('button.done') : t('button.next_step')}
          </Text>
          <NextArrowSvg style={styles.nextIconStyle} />
        </Touchable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  circleContainer: {
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth,
    height: CIRCLE_DIAMETER,
    paddingHorizontal: rem(30),
    paddingVertical: CIRCLE_PADDING_VERTICAL,
  },
  backgroundImage: {
    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    position: 'absolute',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
  },
  progressBar: {
    backgroundColor: COLORS.white,
    width: rem(80),
    height: rem(5),
    borderRadius: 4,
  },
  progressIndicator: {
    backgroundColor: COLORS.shamrock,
    flex: 1,
    borderRadius: 4,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    borderRadius: ICON_CONTAINER_SIZE / 2,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rem(12),
  },
  title: {
    ...font(24, 32, 'black'),
  },
  description: {
    paddingTop: rem(16),
    ...font(14, 24, 'medium'),
  },
  skipAll: {
    ...font(14, 18, 'medium'),
  },
  nextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  next: {
    ...font(16, 20, 'bold'),
    color: COLORS.white,
  },
  nextIconStyle: {marginLeft: rem(12)},
});
