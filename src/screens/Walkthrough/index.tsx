// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StepCircle} from '@screens/Walkthrough/components/StepCircle';
import {useAnimatedStyles} from '@screens/Walkthrough/hooks/useAnimatedStyles';
import {WalkthroughActions} from '@store/modules/Walkthrough/actions';
import {ElementMeasurements} from '@store/modules/Walkthrough/types';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch} from 'react-redux';

export function Walkthrough() {
  const route = useRoute<RouteProp<MainStackParamList, 'Walkthrough'>>();
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
        WalkthroughActions.COMPLETE_WALKTHROUGH_STEP.STATE.create({
          stepKey: step.key,
        }),
      );
    });
  };

  const onSkip = () => {
    runCloseAnimation(() => {
      dispatch(WalkthroughActions.SKIP_WALKTHROUGH.STATE.create());
    });
  };

  useEffect(() => {
    setElementMeasurements(null);
    const ref = step.elementData?.getRef()?.current;
    if (ref) {
      ref.measure((x, y, width, height, pageX, pageY) => {
        setElementMeasurements({x, y, width, height, pageY, pageX});
      });
    } else {
      setElementMeasurements({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        pageY: 0,
        pageX: 0,
      });
    }
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