// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ChevronIcon} from '@svg/ChevronIcon';
import i18n, {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
};

export const LangButton = ({
  containerStyle,
  color = COLORS.primaryDark,
}: Props = {}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();
  return (
    <Touchable
      onPress={() => navigation.navigate('LanguageSettings')}
      hitSlop={SMALL_BUTTON_HIT_SLOP}>
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.flagStyle}>{t('global.flag')}</Text>
        <Text style={[styles.langText, {color}]}>
          {i18n.locale.toUpperCase()}
        </Text>
        <ChevronIcon
          width={rem(5)}
          height={rem(10)}
          color={color}
          style={styles.dropdownIcon}
        />
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langText: {
    ...font(13, null, 'bold'),
    marginLeft: rem(4),
  },
  dropdownIcon: {
    marginLeft: rem(6),
    transform: [{rotateZ: '90deg'}],
  },
  flagStyle: {
    ...font(20),
  },
});
