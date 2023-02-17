// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ChevronIcon} from '@svg/ChevronIcon';
import i18n from '@translations/i18n';
import {localeConfig, SupportedLocale} from '@translations/localeConfig';
import {font} from '@utils/styles';
import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {rem} from 'rn-units';

const FLAG_WIDTH = rem(21);
const FLAG_HEIGHT = (FLAG_WIDTH / 20) * 14;

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

  const {flag} = localeConfig[i18n.locale as SupportedLocale];

  return (
    <Touchable
      onPress={() => navigation.navigate('LanguageSettings')}
      hitSlop={SMALL_BUTTON_HIT_SLOP}>
      <View style={[styles.container, containerStyle]}>
        <Image style={styles.flag} source={flag} />
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
  flag: {
    marginLeft: rem(12),
    width: FLAG_WIDTH,
    height: FLAG_HEIGHT,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: COLORS.black01opacity,
  },
});
