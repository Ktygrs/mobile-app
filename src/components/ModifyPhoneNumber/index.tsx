// SPDX-License-Identifier: BUSL-1.1

import {PhoneNumberInput} from '@components/Inputs/PhoneNumberInput';
import {PhoneNumberSearch} from '@components/PhoneNumberSearch';
import {PrimaryButton} from '@components/PrimaryButton';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {userSelector} from '@store/modules/Auth/selectors';
import {t} from '@translations/i18n';
import {getCountryByCode} from '@utils/country';
import {formatPhoneNumber} from '@utils/phoneNumber';
import {font} from '@utils/styles';
import React, {useRef, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  onSubmitPress: (phone: string) => void;
  showCountriesList: (t: boolean) => void;
  isCountriesVisible: boolean;
  loading?: boolean;
};

export function ModifyPhoneNumber({
  onSubmitPress,
  showCountriesList,
  isCountriesVisible,
  loading = false,
}: Props) {
  const user = useSelector(userSelector);
  const deviceCountry = getCountryByCode(user?.country);

  const [phone, setPhone] = useState('');
  const [focused, setFocused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    deviceCountry.current ?? deviceCountry.default,
  );

  const phoneNumberInputRef = useRef<TextInput | null>(null);

  const handleOnPress = () => {
    onSubmitPress(selectedCountry.iddCode + phone);
  };
  const showCountryCodeSearch = () => {
    showCountriesList(true);
  };
  const hideCountryCodeSearch = () => {
    showCountriesList(false);
  };

  const tabbarOffest = useBottomTabBarOffsetStyle();

  const onPhoneNumberChange = (phoneNumber: string) => {
    setPhone(
      formatPhoneNumber(
        `${selectedCountry.iddCode}${phoneNumber}`,
        selectedCountry.isoCode,
        selectedCountry.iddCode,
      ),
    );
  };

  return (
    <View style={[styles.container, tabbarOffest.current]}>
      {!focused && (
        <Image
          source={Images.phone.modifyPhoneNumber}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <Text style={styles.title}>{t('team.confirm_phone.title')}</Text>
      {!focused && (
        <Text style={styles.description}>
          {t('team.confirm_phone.description')}
        </Text>
      )}
      <PhoneNumberInput
        selectedCountry={selectedCountry}
        showCountryCodeSearch={showCountryCodeSearch}
        value={phone}
        containerStyle={styles.input}
        onValueChange={onPhoneNumberChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        ref={phoneNumberInputRef}
        editable={!loading}
      />
      <PrimaryButton
        text={t('team.confirm_phone.button')}
        onPress={handleOnPress}
        style={styles.allowAccessButton}
        loading={loading}
      />
      {isCountriesVisible && (
        <PhoneNumberSearch
          containerStyle={styles.phoneNumberSearch}
          selectedCountry={selectedCountry}
          close={hideCountryCodeSearch}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          setCountryCode={c => {
            phoneNumberInputRef.current?.focus();
            setSelectedCountry(c);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: rem(25),
    marginBottom: rem(15),
    marginHorizontal: rem(27),
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
    ...font(14, 24, 'regular', 'secondary'),
  },
  allowAccessButton: {
    marginTop: rem(25),
  },
  input: {
    marginTop: rem(20),
  },
  phoneNumberSearch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
