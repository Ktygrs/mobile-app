// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {BackButtonArrow} from '@svg/BackButtonIcon';
import {font} from '@utils/styles';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
  label?: string;
};

export const BackButton = ({
  containerStyle,
  color = COLORS.white,
  label,
}: Props = {}) => {
  const navigation = useNavigation();

  // navigation.canGoBack also takes in account tabs, but getState().routes contains only stack routes
  if (navigation.getState().routes.length === 1) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={navigation.goBack}
      hitSlop={buttonHitSlop}
      style={[styles.container, containerStyle]}>
      <BackButtonArrow fill={color} />
      {label && <Text style={[styles.labelText, {color}]}>{label}</Text>}
    </TouchableOpacity>
  );
};

const buttonHitSlop = {top: 15, left: 15, bottom: 15, right: 15};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    marginLeft: rem(12),
    ...font(16, 20, 'regular'),
  },
});
