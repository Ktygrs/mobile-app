// SPDX-License-Identifier: BUSL-1.1

import {Badge} from '@components/Badge';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {HomeTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CandyBoxMenuIcon} from '@svg/CandyBoxMenuIcon';
import React, {memo, useRef} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {rem, screenWidth} from 'rn-units';

export const MenuButton = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabStackParamList>>();
  const buttonRef = useRef<TouchableOpacity>(null);
  const onMenuPress = () => {
    buttonRef.current?.measure((_, __, width, height, x, y) => {
      navigation.navigate('HomeMenu', {
        top: y + height + rem(16),
        right: screenWidth - x - rem(16),
      });
    });
  };
  const badgeValue = '9+';

  return (
    <Touchable
      hitSlop={SMALL_BUTTON_HIT_SLOP}
      ref={buttonRef}
      onPress={onMenuPress}>
      <CandyBoxMenuIcon stroke={COLORS.downriver} />
      {badgeValue && <Badge value={badgeValue} style={styles.badge} />}
    </Touchable>
  );
});

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -5,
  },
});
