// SPDX-License-Identifier: BUSL-1.1

import {MiningAnimation} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButton/components/MiningAnimation';
import {MiningButtonHandlers} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButton/components/MiningButtonHandlers';
import {MiningButtonTooltip} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButton/components/MiningButtonTooltip';
import {useMiningState} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButton/hooks/useMiningState';
import {useStackingModal} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButton/hooks/useStackingModal';
import {hapticFeedback} from '@utils/device';
import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';

export const MiningButton = () => {
  const initialRender = useRef(true);

  const {
    stateConfig,
    miningStateTooltipSeen,
    closeTooltip,
    startMiningSession,
  } = useMiningState();

  const {lottieWrapperRef, showStackingModal} = useStackingModal();

  useEffect(() => {
    if (stateConfig.showStackingModalOnTransition && !initialRender.current) {
      showStackingModal();
    }
    initialRender.current = false;
  }, [showStackingModal, stateConfig.showStackingModalOnTransition]);

  const gestureHandler = (gesture: 'onTap' | 'onLongPress') => {
    return async () => {
      const gestureConfig = stateConfig[gesture];

      if (!gestureConfig) {
        return null;
      }

      if (gestureConfig.showStackingModal) {
        showStackingModal();
      }

      if (gestureConfig.hapticFeedback) {
        hapticFeedback();
      }

      if (gestureConfig.audioFeedback) {
        const audioFeedback = await gestureConfig.audioFeedback;
        audioFeedback.play();
      }

      if (gestureConfig.startMining) {
        startMiningSession();
      }

      if (!miningStateTooltipSeen) {
        closeTooltip();
      }
    };
  };

  // removeClippedSubviews=false to keep the view and make ref.measure function work
  return (
    <View ref={lottieWrapperRef} removeClippedSubviews={false}>
      {!miningStateTooltipSeen && stateConfig.tooltip && (
        <MiningButtonTooltip
          label={stateConfig.tooltip}
          onClose={closeTooltip}
        />
      )}
      <MiningButtonHandlers
        onTap={gestureHandler('onTap')}
        onLongPress={gestureHandler('onLongPress')}>
        <MiningAnimation source={stateConfig.animation} />
      </MiningButtonHandlers>
    </View>
  );
};
