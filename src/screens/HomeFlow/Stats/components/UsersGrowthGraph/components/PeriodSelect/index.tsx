// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ChevronSmallIcon} from '@svg/ChevronSmallIcon';
import {font} from '@utils/styles';
import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {rem, screenWidth} from 'rn-units';

type Props = {
  selectedIndex: number;
  options: {label: string}[];
  onChange: (index: number) => void;
};

export const PeriodSelect = ({selectedIndex, options, onChange}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const buttonRef = useRef<TouchableOpacity>(null);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const onMenuPress = () => {
    setMenuVisible(true);
    buttonRef.current?.measure((_, __, width, height, x, y) => {
      navigation.navigate('ContextualMenu', {
        coords: {
          top: y + height + rem(16),
          right: screenWidth - x - rem(46),
        },
        buttons: options.map((option, index) => ({
          label: option.label,
          onPress: () => onChange(index),
        })),
        onClose: () => setMenuVisible(false),
      });
    });
  };
  return (
    <Touchable
      onPress={onMenuPress}
      ref={buttonRef}
      hitSlop={SMALL_BUTTON_HIT_SLOP}
      style={styles.container}>
      <Text style={styles.labelText}>{options[selectedIndex]?.label}</Text>
      <ChevronSmallIcon
        style={[styles.chevron, isMenuVisible && styles.chevron_up]}
        color={COLORS.primaryDark}
        height={rem(12)}
        width={rem(12)}
      />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    marginLeft: rem(4),
  },
  chevron_up: {
    transform: [{rotate: '180deg'}],
  },
  labelText: {
    ...font(12, 15, 'medium', 'primaryDark'),
  },
});
