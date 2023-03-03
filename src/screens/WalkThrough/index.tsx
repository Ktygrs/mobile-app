// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp} from '@react-navigation/native';
import {StepCircle} from '@screens/WalkThrough/components/StepCircle';
import {useAnimatedStyles} from '@screens/WalkThrough/hooks/useAnimatedStyles';
import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch} from 'react-redux';

type WalkThroughRouteProps = RouteProp<MainStackParamList, 'WalkThrough'>;

interface WalkThroughProps {
  route: WalkThroughRouteProps;
}

export function WalkThrough({route}: WalkThroughProps) {
  const {step, total, index} = route.params;

  const dispatch = useDispatch();

  const [elementHeight, setElementHeight] = useState<number>();

  const {elementAnimatedStyle, circleAnimatedStyle, runCloseAnimation} =
    useAnimatedStyles({step, elementHeight});

  const onNext = () => {
    runCloseAnimation(() => {
      dispatch(
        WalkThroughActions.COMPLETE_WALK_THROUGH_STEP.STATE.create({
          stepKey: step.key,
        }),
      );
    });
  };

  const onSkip = () => {
    runCloseAnimation(() => {
      dispatch(WalkThroughActions.SKIP_WALK_THROUGH.STATE.create());
    });
  };

  if (!step.elementData) {
    return null;
  }

  return (
    <View style={styles.background}>
      <StepCircle
        elementHeight={elementHeight}
        step={step}
        onNext={onNext}
        onSkip={onSkip}
        animatedStyle={circleAnimatedStyle}
        totalSteps={total}
        stepIndex={index}
      />
      <Animated.View
        style={[elementAnimatedStyle, {top: step.elementData.top}]}
        onLayout={({nativeEvent}) => {
          setElementHeight(nativeEvent.layout.height);
        }}>
        {step.elementData.render()}
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
