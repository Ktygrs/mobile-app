// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/Inputs/CommonInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {TicketIconSvg} from '@svg/Ticket';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onSubmitPress: (code: string) => void;
  loading?: boolean;
};

export function ConfirmPhoneNumber({onSubmitPress, loading = false}: Props) {
  const [code, onCodeChange] = useState('');
  const [focused, setFocused] = useState(false);

  const handleOnPress = () => {
    onSubmitPress(code);
  };

  const tabbarOffest = useBottomTabBarOffsetStyle();

  return (
    <View style={[styles.container, tabbarOffest.current]}>
      {!focused && (
        <Image
          source={Images.phone.confirmPhoneNumber}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <Text style={styles.title}>{t('team.confirm_code.title')}</Text>
      {!focused && (
        <Text style={styles.description}>
          {t('team.confirm_code.description')}
        </Text>
      )}
      <CommonInput
        placeholder={t('team.confirm_code.placeholder')}
        value={code}
        onChangeText={onCodeChange}
        icon={<TicketIconSvg />}
        autoCorrect={false}
        keyboardType="name-phone-pad"
        returnKeyType="done"
        onSubmitEditing={handleOnPress}
        containerStyle={styles.input}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        editable={!loading}
      />
      <PrimaryButton
        text={t('team.confirm_code.button')}
        onPress={handleOnPress}
        style={styles.allowAccessButton}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: rem(25),
    paddingHorizontal: rem(27),
  },
  image: {
    alignSelf: 'center',
    flex: 1,
    maxHeight: rem(200),
  },
  title: {
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(2),
    ...font(24, 29, 'black', 'primaryDark'),
  },
  description: {
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(7),
    ...font(14, 24, 'regular', 'secondary'),
  },
  input: {
    marginTop: rem(20),
  },
  allowAccessButton: {
    marginTop: rem(25),
  },
});
