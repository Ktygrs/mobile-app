// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {Images} from '@images';
import {useCirclePosition} from '@screens/WalkThrough/components/hooks/useCirclePosition';
import {useParseDescription} from '@screens/WalkThrough/components/hooks/useParseDescription';
import {CIRCLE_DIAMETER} from '@screens/WalkThrough/constants';
import {WalkThroughStep} from '@store/modules/WalkThrough/types';
import {NextArrowSvg} from '@svg/NextArrow';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import Animated, {AnimatedStyleProp} from 'react-native-reanimated';
import {rem, screenWidth} from 'rn-units';

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
    elementTop: step.elementData?.topPositionOfHighlightedElement,
    circlePosition: step.circlePosition,
  });

  const {parsedDescription} = useParseDescription({step});

  return (
    <Animated.View
      style={[styles.circleContainer, animatedStyle, circlePosition]}>
      <Image
        source={Images.backgrounds.walkthroughBg}
        style={styles.backgroundImage}
      />
      <View style={styles.titleContainer}>
        {step.Icon ? (
          <View style={styles.iconContainer}>{step.Icon}</View>
        ) : null}
        <Text style={styles.titleText}>{step.title}</Text>
      </View>
      <Text style={styles.description}>{parsedDescription}</Text>
      <View style={styles.controls}>
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
    justifyContent: 'center',
    width: screenWidth,
    height: CIRCLE_DIAMETER,
    paddingHorizontal: rem(30),
    zIndex: 1,
  },
  backgroundImage: {
    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
  },
  controls: {
    marginTop: rem(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: rem(12),
  },
  titleText: {
    ...font(20, 24, 'bold'),
  },
  description: {
    marginTop: rem(16),
    ...font(14, 24, 'medium'),
  },
  skipAll: {
    ...font(14, 17, 'medium'),
  },
  nextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  next: {
    ...font(17, 21, 'bold'),
  },
  nextIconStyle: {marginLeft: rem(12)},
});
