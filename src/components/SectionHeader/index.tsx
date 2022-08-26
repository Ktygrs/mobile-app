// SPDX-License-Identifier: BUSL-1.1

import {SCREEN_SIDE_OFFSET, SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  title: string;
  action?: string;
  onActionPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const SECTION_HEADER_HEIGH = rem(42);

export const SectionHeader = memo(
  ({title, action, onActionPress, style}: Props) => {
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.titleText}>{title.toUpperCase()}</Text>
        {action && (
          <TouchableOpacity
            hitSlop={SMALL_BUTTON_HIT_SLOP}
            onPress={onActionPress}>
            <Text style={styles.actionText}>{action}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    justifyContent: 'space-between',
    paddingTop: rem(24),
    height: SECTION_HEADER_HEIGH,
  },
  titleText: {
    ...font(15, 18, 'black', 'primaryDark'),
  },
  actionText: {
    ...font(12, 15, 'medium', 'primaryDark'),
  },
});
