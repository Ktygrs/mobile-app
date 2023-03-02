// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StepCircle} from '@screens/WalkThrough/components/StepCircle';
import {useAnimatedStyles} from '@screens/WalkThrough/hooks/useAnimatedStyles';
import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch} from 'react-redux';

type WalkThroughRouteProps = RouteProp<MainStackParamList, 'WalkThrough'>;

interface WalkThroughProps {
  route: WalkThroughRouteProps;
}

export function WalkThrough({route}: WalkThroughProps) {
  const {step, total, index} = route.params;
  const isLastStep = index === total - 1;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [elementHeight, setElementHeight] = useState<number>();

  const closeAnimationCallback = useCallback(() => {
    step?.after?.();
    dispatch(
      WalkThroughActions.COMPLETE_WALK_THROUGH_STEP.STATE.create({
        stepKey: step.key,
      }),
    );
    if (isLastStep) {
      navigation.goBack();
    }
  }, [dispatch, isLastStep, navigation, step]);

  const {elementAnimatedStyle, circleAnimatedStyle, runCloseAnimation} =
    useAnimatedStyles({step, elementHeight, closeAnimationCallback});

  if (!step.elementData) {
    return null;
  }

  return (
    <View style={styles.background}>
      <StepCircle
        elementHeight={elementHeight}
        step={step}
        onNext={runCloseAnimation}
        animatedStyle={circleAnimatedStyle}
        totalSteps={total}
        stepIndex={index}
      />
      <Animated.View
        style={[
          elementAnimatedStyle,
          {top: step.elementData.topPositionOfHighlightedElement},
        ]}
        onLayout={({nativeEvent}) => {
          setElementHeight(nativeEvent.layout.height);
        }}>
        {step.elementData.renderStepHighlight()}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.transparentBackground,
  },
});
