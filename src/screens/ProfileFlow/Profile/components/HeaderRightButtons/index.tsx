// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {SettingsButton} from '@navigation/components/Header/components/SettingsButton';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const HeaderRightButtons = () => {
  return (
    <View style={styles.container}>
      <SettingsButton
        containerStyle={styles.settingsButton}
        color={COLORS.primaryDark}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsButton: {
    marginLeft: 12,
  },
});
