// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {BoostCall} from '@navigation/components/MainTabBar/components/MiningTooltip/components/BoostCall';
import {BoostInfo} from '@navigation/components/MainTabBar/components/MiningTooltip/components/BoostInfo';
import {MiningInfo} from '@navigation/components/MainTabBar/components/MiningTooltip/components/MiningInfo';
import {IS_STAKING_ACTIVE} from '@screens/Staking/components/Footer';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const MiningTooltip = () => {
  return (
    <View
      style={[
        styles.container,
        IS_STAKING_ACTIVE.current && styles.container_big,
      ]}>
      <MiningInfo timeLeft={'21h 14m 3s'} rate={'+29.99'} />
      {!IS_STAKING_ACTIVE.current ? (
        <BoostCall />
      ) : (
        <BoostInfo period={'2 years'} balance={'212,932 ice'} bonus={'+200%'} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    paddingTop: rem(22),
    backgroundColor: COLORS.white,
    borderRadius: rem(20),
  },
  container_big: {
    paddingTop: rem(66),
  },
});
