// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {Images} from '@images';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp} from '@react-navigation/native';
import {
  ANIMATION_CONFIG,
  ANIMATION_DELAY,
  CIRCLE_DIAMETER,
  CIRCLE_PADDING_VERTICAL,
} from '@screens/WalkThrough/constants';
import {useCirclePosition} from '@screens/WalkThrough/hooks/useCirclePosition';
import {useParseDescription} from '@screens/WalkThrough/hooks/useParseDescription';
import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import {NextArrowSvg} from '@svg/NextArrow';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';
import {screenWidth} from 'rn-units/index';
import {clearTimeout} from 'timers';

type WalkThroughRouteProps = RouteProp<MainStackParamList, 'WalkThrough'>;

interface WalkThroughProps {
  route: WalkThroughRouteProps;
}

export function WalkThrough({route}: WalkThroughProps) {
  const {step, total, index} = route.params;
  const isLastStep = index === total - 1;
  const dispatch = useDispatch();

  const [elementHeight, setElementHeight] = useState(0);
  const [isElementHeightSet, setIsElementHeightSet] = useState(false);
  const elementOpacity = useSharedValue(0);
  const circleOpacity = useSharedValue(0);
  const elementAnimatedStyle = useAnimatedStyle(() => ({
    opacity: elementOpacity.value,
  }));
  const circleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: circleOpacity.value,
  }));

  useEffect(() => {
    return () => {
      cancelAnimation(elementOpacity);
      cancelAnimation(circleOpacity);
    };
  }, [circleOpacity, elementOpacity]);

  useEffect(() => {
    if (isElementHeightSet && step) {
      cancelAnimation(elementOpacity);
      cancelAnimation(circleOpacity);
      elementOpacity.value = withDelay(
        ANIMATION_DELAY,
        withTiming(1, ANIMATION_CONFIG, () => {
          circleOpacity.value = withDelay(
            ANIMATION_DELAY,
            withTiming(1, ANIMATION_CONFIG),
          );
        }),
      );
    }
  }, [circleOpacity, isElementHeightSet, elementOpacity, step]);

  const onNext = useCallback(() => {
    cancelAnimation(elementOpacity);
    cancelAnimation(circleOpacity);
    circleOpacity.value = withTiming(0, ANIMATION_CONFIG, () => {
      elementOpacity.value = withDelay(
        ANIMATION_DELAY,
        withTiming(0, ANIMATION_CONFIG),
      );
    });
    //TODO::use callback instead of timer
    const handler = setTimeout(() => {
      step?.after?.();
      dispatch(
        WalkThroughActions.COMPLETE_WALK_THROUGH_STEP.STATE.create({
          stepKey: step.key,
        }),
      );
    }, ANIMATION_CONFIG.duration * 2 + ANIMATION_DELAY);
    return () => clearTimeout(handler);
  }, [elementOpacity, circleOpacity, step, dispatch]);

  // const onFinalise = useOnFinalize({walkThroughType});

  const circlePosition = useCirclePosition({
    elementHeight,
    elementData: step?.elementData,
  });

  const {parsedDescription} = useParseDescription({step});

  if (!step?.elementData) {
    return null;
  }

  const {renderStepHighlight, icon} = step.elementData;

  return (
    <View style={styles.background}>
      <Animated.View
        style={[
          styles.circleContainer,
          circleAnimatedStyle,
          {top: circlePosition},
        ]}>
        <Image
          source={Images.backgrounds.walkthroughBg}
          style={styles.backgroundImage}
        />
        <View>
          <View style={styles.row}>
            <View style={styles.titleContainer}>
              {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
              <Text style={styles.title}>{step.title}</Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressIndicator,
                  {width: `${(index / total) * 100}%`},
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
      <Animated.View
        style={elementAnimatedStyle}
        onLayout={({nativeEvent}) => {
          setElementHeight(nativeEvent.layout.height);
          setIsElementHeightSet(true);
        }}>
        {renderStepHighlight()}
      </Animated.View>
    </View>
  );
}

const ICON_CONTAINER_SIZE = rem(32);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.transparentBackground,
  },
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
