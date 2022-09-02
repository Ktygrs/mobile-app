// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DropdownIcon} from '@svg/DropdownIcon';
import {WorldIcon} from '@svg/WorldIcon';
import i18n from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
};

export const LangButton = ({
  containerStyle,
  color = COLORS.white,
}: Props = {}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();
  return (
    <Touchable
      onPress={() => navigation.navigate('LanguageSettings')}
      hitSlop={SMALL_BUTTON_HIT_SLOP}>
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.langText, {color}]}>
          {i18n.currentLocale().toUpperCase()}
        </Text>
        <WorldIcon fill={color} style={styles.worldIcon} />
        <DropdownIcon fill={color} style={styles.dropdownIcon} />
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
  },
  worldIcon: {
    marginLeft: 4,
  },
  dropdownIcon: {
    marginLeft: 3,
  },
});
