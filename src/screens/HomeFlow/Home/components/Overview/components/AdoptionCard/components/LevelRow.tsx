// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Divider} from '@screens/HomeFlow/Home/components/Overview/components/AdoptionCard/components/Divider';
import {LockIcon} from '@svg/LockIcon';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const LevelRow = ({
  level,
  iceValue,
  usersValue,
  locked,
}: {
  level: string;
  iceValue: string;
  usersValue: string;
  locked?: boolean;
}) => {
  return (
    <View style={styles.row}>
      <View style={[styles.flank, locked ? styles.semitransparent : null]}>
        <Text style={styles.valueText}>
          {iceValue}
          <Text style={styles.valueCurrencyText}>{'\n'}ice</Text>
        </Text>
        <Divider />
      </View>
      <View>
        <View style={[styles.step, locked ? styles.semitransparent : null]}>
          <Text style={styles.stepValueText}>{level}</Text>
          <Text style={styles.stepLabelText}>level</Text>
        </View>
        {locked && (
          <View style={styles.lock}>
            <LockIcon height={rem(9)} width={rem(7)} />
          </View>
        )}
      </View>
      <View style={[styles.flank, locked ? styles.semitransparent : null]}>
        <Divider />
        <Text style={styles.valueText}>
          {usersValue}
          <Text style={styles.valueCurrencyText}>{'\n'}users</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  semitransparent: {
    opacity: 0.5,
  },
  flank: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    textAlign: 'center',
    minWidth: rem(36),
    ...font(15, 18, 'medium'),
  },
  valueCurrencyText: {
    opacity: 0.8,
    ...font(13, 16, 'regular'),
  },
  step: {
    width: rem(52),
    height: rem(42),
    backgroundColor: COLORS.white,
    borderRadius: rem(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepValueText: {
    ...font(15, 18, 'black', 'deepKoamaru'),
  },
  stepLabelText: {
    opacity: 0.8,
    ...font(13, 16, 'regular', 'deepKoamaru'),
  },
  lock: {
    position: 'absolute',
    top: 4,
    right: 3,
    width: rem(14),
    height: rem(14),
    borderRadius: rem(7),
    backgroundColor: COLORS.spindle,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
