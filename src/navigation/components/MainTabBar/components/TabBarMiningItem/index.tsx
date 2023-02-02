// SPDX-License-Identifier: BUSL-1.1

import {Images} from '@images';
import {MAIN_TAB_BAR_HEIGHT} from '@navigation/components/MainTabBar';
import {MiningButton} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButton';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const TabBarMiningItem = () => {
  return (
    <ImageBackground
      style={styles.container}
      source={Images.tabbar.miningBackground}>
      <View style={styles.button}>
        <MiningButton />
      </View>
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
