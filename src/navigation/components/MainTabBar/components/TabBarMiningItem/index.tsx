// SPDX-License-Identifier: BUSL-1.1

import {useHandleLottieBackground} from '@hooks/useHandleLottieBackground';
import {Images} from '@images';
import {MAIN_TAB_BAR_HEIGHT} from '@navigation/components/MainTabBar';
import {MiningAnimation} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningAnimation';
import {MiningButtonHandlers} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButtonHandlers';
import {MiningButtonTooltip} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButtonTooltip';
import {useMiningState} from '@navigation/components/MainTabBar/components/TabBarMiningItem/hooks/useMiningState';
import {useMiningTooltipModal} from '@navigation/components/MainTabBar/components/TabBarMiningItem/hooks/useMiningTooltipModal';
import {playLocalAudio} from '@services/audio';
import {hapticFeedback} from '@utils/device';
import LottieView from 'lottie-react-native';
import React, {useRef} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const TabBarMiningItem = () => {
  const lottieRef = useRef<LottieView>(null);

  useHandleLottieBackground(lottieRef);

  const {stateConfig, miningStateTooltipSeen, closeTooltip, startMining} =
    useMiningState();

  const {lottieWrapperRef} = useMiningTooltipModal({
    showTooltip: !!stateConfig.showModalTooltip,
  });

  const onMiningActivation = () => {
    hapticFeedback();
    if (stateConfig.audio) {
      playLocalAudio(stateConfig.audio);
    }
    startMining();
  };

  return (
    <ImageBackground
      style={styles.container}
      source={Images.tabbar.miningBackground}>
      {!miningStateTooltipSeen && stateConfig.tooltip && (
        <MiningButtonTooltip
          label={stateConfig.tooltip}
          onClose={closeTooltip}
        />
      )}
      <MiningButtonHandlers
        longPressActivation={!!stateConfig.longPressActivation}
        onTap={onMiningActivation}
        onLongPress={onMiningActivation}>
        <View style={styles.button}>
          {/* removeClippedSubviews=false to keep the view and make ref.measure function work */}
          <View ref={lottieWrapperRef} removeClippedSubviews={false}>
            <MiningAnimation ref={lottieRef} source={stateConfig.animation} />
          </View>
        </View>
      </MiningButtonHandlers>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: MAIN_TAB_BAR_HEIGHT,
    width: rem(112),
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    top: rem(-42),
    height: rem(100),
    width: rem(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
