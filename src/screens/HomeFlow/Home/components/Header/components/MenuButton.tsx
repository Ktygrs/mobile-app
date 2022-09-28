// SPDX-License-Identifier: BUSL-1.1

import {Badge} from '@components/Badge';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {HomeTabStackParamList, MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BellIcon} from '@svg/BellIcon';
import {CandyBoxMenuIcon} from '@svg/CandyBoxMenuIcon';
import {ChatBubblesIcon} from '@svg/ChatBubblesIcon';
import {StatsIcon} from '@svg/StatsIcon';
import {t} from '@translations/i18n';
import React, {memo, useRef} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {rem, screenWidth} from 'rn-units';

export const MenuButton = memo(() => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList & HomeTabStackParamList>
    >();
  const buttonRef = useRef<TouchableOpacity>(null);
  const onMenuPress = () => {
    buttonRef.current?.measure((_, __, width, height, x, y) => {
      navigation.navigate('ContextualMenu', {
        coords: {
          top: y + height + rem(16),
          right: screenWidth - x - rem(16),
        },
        buttons: [
          {
            icon: BellIcon,
            label: t('home.menu.notifications'),
            onPress: () => {},
          },
          {
            icon: StatsIcon,
            label: t('home.menu.stats'),
            onPress: () => navigation.navigate('Stats'),
          },
          {
            icon: ChatBubblesIcon,
            label: t('home.menu.help'),
            onPress: () => {},
          },
        ],
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
