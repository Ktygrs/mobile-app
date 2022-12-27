// SPDX-License-Identifier: BUSL-1.1

import {User, WalkThroughType} from '@api/user/types';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {
  WalkThroughContext,
  WalkThroughData,
} from '@contexts/WalkThroughContext';
import {Images} from '@images';
import {
  ANIMATION_CONFIG,
  ANIMATION_DELAY,
  CIRCLE_DIAMETER,
  CIRCLE_PADDING_VERTICAL,
} from '@screens/WalkThrough/constants';
import {useCirclePosition} from '@screens/WalkThrough/hooks/useCirclePosition';
import {useDescriptionData} from '@screens/WalkThrough/hooks/useDescriptionData';
import {useOnFinalize} from '@screens/WalkThrough/hooks/useOnFinalize';
import {DescriptionRenderData} from '@screens/WalkThrough/types';
import {userSelector} from '@store/modules/Account/selectors';
import {NextArrowSvg} from '@svg/NextArrow';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Portal} from 'react-native-portalize';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';
import {screenWidth} from 'rn-units/index';
import {clearTimeout} from 'timers';

type Props = {
  walkThroughType: WalkThroughType;
  numberOfSteps: number;
};

export function WalkThrough({walkThroughType, numberOfSteps}: Props) {
  const {getStepData} = useContext(WalkThroughContext);
  const [step, setStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [version, setVersion] = useState(1);
  const [stepData, setStepData] = useState<null | WalkThroughData>(null);
  const prevStepDataRef = useRef<WalkThroughData | null>(null);

  const stepDataCandidate = getStepData(step);
  const prevStepDataCandidateRef = useRef<WalkThroughData | null>(null);

  const user = useSelector(userSelector) as User;

  useEffect(() => {
    if (!stepDataCandidate) {
      return;
    }
    const prevStepDataCandidate = prevStepDataCandidateRef.current;
    setVersion((v: number) => Math.max(v, stepDataCandidate.version));
    const walkThroughElement =
      user.clientData?.walkTroughProgress?.[walkThroughType];
    if (walkThroughElement) {
      if (stepDataCandidate.version > walkThroughElement.version) {
        if (
          prevStepDataCandidate &&
          prevStepDataCandidate !== prevStepDataRef.current
        ) {
          prevStepDataRef.current = prevStepDataCandidate;
          if (prevStepDataCandidate.onNext) {
            prevStepDataCandidate.onNext();
          }
        }
        setStepData(stepDataCandidate);
      } else {
        setStep((s: number) => s + 1);
      }
    } else {
      setStepData(stepDataCandidate);
    }
    prevStepDataCandidateRef.current = stepDataCandidate;
  }, [
    user.clientData?.walkTroughProgress,
    walkThroughType,
    stepDataCandidate,
    prevStepDataCandidateRef,
  ]);

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
    const prevStepData = prevStepDataRef.current;
    if (isElementHeightSet && stepData) {
      cancelAnimation(elementOpacity);
      cancelAnimation(circleOpacity);
      elementOpacity.value = withDelay(
        ANIMATION_DELAY * (prevStepData?.onNext ? 2 : 1),
        withTiming(1, ANIMATION_CONFIG, () => {
          circleOpacity.value = withDelay(
            ANIMATION_DELAY,
            withTiming(1, ANIMATION_CONFIG),
          );
        }),
      );
      prevStepDataRef.current = stepData;
    }
  }, [
    circleOpacity,
    isElementHeightSet,
    stepData,
    elementOpacity,
    prevStepDataRef,
  ]);

  const onNext = useCallback(() => {
    cancelAnimation(elementOpacity);
    cancelAnimation(circleOpacity);
    circleOpacity.value = withTiming(0, ANIMATION_CONFIG, () => {
      elementOpacity.value = withDelay(
        ANIMATION_DELAY,
        withTiming(0, ANIMATION_CONFIG),
      );
    });
    const handler = setTimeout(() => {
      if (stepData?.onNext) {
        stepData.onNext();
      }
      setStep(s => s + 1);
    }, ANIMATION_CONFIG.duration * 2 + ANIMATION_DELAY);
    return () => clearTimeout(handler);
  }, [elementOpacity, circleOpacity, stepData]);

  const onFinalise = useOnFinalize({walkThroughType, version, setIsFinished});

  const isLastStep = step === numberOfSteps;
  const circlePosition = useCirclePosition({elementHeight, stepData});
  const descriptionData = useDescriptionData({step, walkThroughType});

  if (isFinished || !stepData) {
    return null;
  }

  const {renderStepHighlight, icon} = stepData;

  return (
    <Portal>
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
                <Text style={styles.title}>
                  {t(`walkthrough.${walkThroughType}.step_${step}.title`)}
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressIndicator,
                    {width: `${(step / numberOfSteps) * 100}%`},
                  ]}
                />
              </View>
            </View>
            <Text style={styles.description}>
              {descriptionData.map(
                (data: DescriptionRenderData, index: number) => {
                  switch (data.type) {
                    case 'ice':
                      return (
                        <IceLabel
                          key={`${data.type}:${index}`}
                          iconSize={16}
                          iconOffsetY={Platform.OS === 'ios' ? rem(16) : rem(2)}
                          color={COLORS.white}
                          textStyle={styles.ice}
                        />
                      );
                    case 'url': {
                      const linkText = t(
                        `walkthrough.${walkThroughType}.step_${step}.link_text`,
                        {
                          defaultValue: t('news.read_more'),
                        },
                      );
                      return (
                        <Text key={`${data.type}:${index}`}>
                          {' '}
                          <Text
                            style={styles.underlineText}
                            onPress={() => {
                              Linking.openURL(data.value ?? '');
                            }}>
                            {linkText}
                          </Text>
                        </Text>
                      );
                    }
                    default:
                      return (
                        <Text key={`${data.type}:${index}`}>{data.value}</Text>
                      );
                  }
                },
              )}
            </Text>
          </View>
          <View style={styles.row}>
            <Pressable onPress={() => onFinalise(true)} hitSlop={12}>
              <Text style={styles.skipAll}>{t('button.skip_all')}</Text>
            </Pressable>
            <Pressable
              style={styles.nextContainer}
              hitSlop={12}
              onPress={isLastStep ? () => onFinalise(false) : onNext}>
              <Text style={styles.next}>
                {isLastStep ? t('button.done') : t('button.next_step')}
              </Text>
              <NextArrowSvg style={{marginLeft: rem(12)}} />
            </Pressable>
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
    </Portal>
  );
}

const ICON_CONTAINER_SIZE = rem(32);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
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
  underlineText: {
    textDecorationLine: 'underline',
  },
  ice: {
    ...font(14, 24, 'medium'),
    borderWidth: 1,
    borderColor: 'white',
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
});
