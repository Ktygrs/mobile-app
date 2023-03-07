// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp} from '@react-navigation/native';
import {StepCircle} from '@screens/WalkThrough/components/StepCircle';
import {useAnimatedStyles} from '@screens/WalkThrough/hooks/useAnimatedStyles';
import {WalkThroughActions} from '@store/modules/WalkThrough/actions';
import {ElementMeasurements} from '@store/modules/WalkThrough/types';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch} from 'react-redux';

type WalkThroughRouteProps = RouteProp<MainStackParamList, 'WalkThrough'>;

interface WalkThroughProps {
  route: WalkThroughRouteProps;
}

export function WalkThrough({route}: WalkThroughProps) {
  const {step, total, index} = route.params;

  const [elementMeasurements, setElementMeasurements] =
    useState<ElementMeasurements | null>(null);

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

  useEffect(() => {
    setElementMeasurements(null);
    step.elementData
      ?.getRef()
      .current?.measure((x, y, width, height, pageX, pageY) => {
        setElementMeasurements({x, y, width, height, pageY, pageX});
      });
  }, [step]);

  if (!step.elementData || !elementMeasurements) {
    return <View style={styles.background} />;
  }

  return (
    <View style={styles.background}>
      <StepCircle
        elementHeight={elementHeight}
        elementTop={step.elementData.getTop(elementMeasurements)}
        step={step}
        onNext={onNext}
        onSkip={onSkip}
        animatedStyle={circleAnimatedStyle}
        totalSteps={total}
        stepIndex={index}
      />
      <Animated.View
        style={[
          elementAnimatedStyle,
          {top: step.elementData.getTop(elementMeasurements)},
        ]}
        onLayout={({nativeEvent}) => {
          setElementHeight(nativeEvent.layout.height);
        }}>
        {step.elementData.render(elementMeasurements)}
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
