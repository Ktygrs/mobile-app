// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {InviteIcon} from '@svg/InviteIcon';
import {StarTransparentIcon} from '@svg/StarTransparentIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const InviteButton = ({style}: Props = {}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const onInvitePress = () => navigation.navigate('InviteShare');

  return (
    <Touchable style={[styles.button, style]} onPress={onInvitePress}>
      <View style={styles.iconWrapper}>
        <InviteIcon style={styles.icon} />
      </View>
      <View style={styles.body}>
        <Text style={styles.mainText}>{t('button.invite_friend.title')}</Text>
        <Text style={styles.noteText}>
          {t('button.invite_friend.description')}
        </Text>
      </View>
      <StarTransparentIcon style={styles.backgroundIcon} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    height: rem(64),
    borderRadius: rem(15),
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
  },
  iconWrapper: {
    width: rem(36),
    height: rem(36),
    borderRadius: rem(12),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: rem(14),
  },
  icon: {
    width: rem(21),
    height: rem(20),
  },
  body: {
    marginLeft: rem(10),
  },
  mainText: {
    ...font(15, 18, 'black'),
  },
  noteText: {
    ...font(12, 14, 'medium'),
  },
  backgroundIcon: {
    position: 'absolute',
    right: -rem(3),
    top: -rem(18),
    width: rem(74),
    height: rem(74),
  },
});
