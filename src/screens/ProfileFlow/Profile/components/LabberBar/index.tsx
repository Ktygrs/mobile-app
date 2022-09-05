// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {LadderItem} from '@screens/ProfileFlow/Profile/components/LabberBar/components/LadderItem';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const LadderBar = memo(() => {
  return (
    <View style={styles.ladder}>
      <View style={styles.ladderItem}>
        <Text style={styles.ladderLabelText}>
          {t('profile.global_rank').toUpperCase()}
        </Text>
        <LadderItem text={'606,683'} />
      </View>
      <View style={styles.ladderItem}>
        <Text style={styles.ladderLabelText}>
          {t('global.referrals').toUpperCase()}
        </Text>
        <LadderItem text={'1,024'} />
      </View>
      <View style={styles.ladderItem}>
        <Text style={styles.ladderLabelText}>
          {t('global.level').toUpperCase()}
        </Text>
        <LadderItem text={'21'} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  ladder: {
    flexDirection: 'row',
    paddingHorizontal: rem(42),
    backgroundColor: COLORS.primaryLight,
    paddingBottom: rem(40),
    justifyContent: 'space-between',
  },
  ladderItem: {
    alignItems: 'center',
  },
  ladderLabelText: {
    width: rem(76),
    textAlign: 'center',
    marginTop: rem(3),
    ...font(10, 12, 'regular', 'periwinkleGray'),
  },
});
