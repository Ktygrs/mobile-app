// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {ClosedEye} from '@svg/ClosedEye';
import {font} from '@utils/styles';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  hidden?: boolean;
  text: string;
  enabled?: boolean;
};

export const LadderItem = ({hidden, text, enabled = false}: Props) => {
  const [isHidden, hide] = useState<boolean>(!!hidden);
  return (
    <Touchable onPress={() => enabled && hide(!isHidden)}>
      <View style={styles.ladderItem}>
        {isHidden ? (
          <View style={styles.hiddenView}>
            <ClosedEye />
          </View>
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  ladderItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: rem(26),
  },
  hiddenView: {
    height: rem(24),
    width: rem(76),
    borderRadius: rem(16),
    backgroundColor: COLORS.dodgerBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: rem(2),
    ...font(20, 24, 'bold'),
  },
});
