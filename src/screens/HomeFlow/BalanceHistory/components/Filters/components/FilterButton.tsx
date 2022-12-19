// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress: () => void;
  label: string;
  selected: boolean;
  preset: 'dark' | 'light';
  button?: ReactNode;
};

export const FilterButton = ({
  onPress,
  label,
  button,
  selected,
  preset,
}: Props) => {
  let containerStyle;
  switch (preset) {
    case 'dark':
      containerStyle = selected
        ? styles.containerDarkActive
        : styles.containerDarkInactive;
      break;
    case 'light':
      containerStyle = selected
        ? styles.containerLightActive
        : styles.containerLightInactive;
  }
  return (
    <Touchable onPress={onPress} style={[styles.container, containerStyle]}>
      <Text
        style={[
          styles.buttonLightText,
          preset === 'light' && !selected && styles.buttonDarkText,
        ]}>
        {label}
      </Text>
      {button}
    </Touchable>
  );
};

export const FilterButtonDivider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: {
    height: rem(30),
    paddingHorizontal: rem(14),
    marginHorizontal: rem(4),
    borderRadius: rem(16),
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerDarkInactive: {
    backgroundColor: COLORS.primaryDark,
  },
  containerDarkActive: {
    backgroundColor: COLORS.shamrock,
  },
  containerLightInactive: {
    backgroundColor: COLORS.secondaryFaint,
  },
  containerLightActive: {
    backgroundColor: COLORS.primaryLight,
  },
  buttonLightText: {
    ...font(12, 15, 'medium'),
  },
  buttonDarkText: {
    ...font(12, 15, 'medium', 'secondary'),
  },
  divider: {
    backgroundColor: COLORS.periwinkleGray,
    width: 1,
    marginHorizontal: rem(4),
  },
});
