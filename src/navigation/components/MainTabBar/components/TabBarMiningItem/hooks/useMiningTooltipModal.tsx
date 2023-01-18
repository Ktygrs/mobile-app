// SPDX-License-Identifier: BUSL-1.1

import {MiningTooltip} from '@navigation/components/MainTabBar/components/MiningTooltip';
import {MiningAnimation} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningAnimation';
import {MiningStateConfig} from '@navigation/components/MainTabBar/components/TabBarMiningItem/config';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {rem} from 'rn-units';

const MiningAnimationComponent = () => (
  <MiningAnimation source={MiningStateConfig.active.animation} />
);
const MiningTooltipComponent = () => <MiningTooltip />;

export const useMiningTooltipModal = ({
  showTooltip,
}: {
  showTooltip: boolean;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const lottieWrapperRef = useRef<View>(null);
  const initialRender = useRef(true);

  useEffect(() => {
    if (showTooltip && !initialRender.current) {
      navigation.navigate('Tooltip', {
        position: 'above',
        targetRef: lottieWrapperRef,
        descriptionOffset: rem(40),
        targetCircleSize: rem(92),
        TargetComponent: MiningAnimationComponent,
        DescriptionComponent: MiningTooltipComponent,
      });
    }
    initialRender.current = false;
  }, [navigation, showTooltip]);

  return {lottieWrapperRef};
};
