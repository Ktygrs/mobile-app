// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Country} from '@constants/countries';
import {FONTS} from '@constants/fonts';
import {ArrowDownIcon} from '@svg/ArrowDownIcon';
import {t} from '@translations/i18n';
import * as React from 'react';
import {forwardRef, Ref} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {font, rem} from 'rn-units';

interface PhoneNumberInputProps extends TextInputProps {
  selectedCountry: Country;
  containerStyle?: StyleProp<ViewStyle>;
  showCountryCodeSearch: () => void;
  onValueChange: (v: string) => void;
}

export const PhoneNumberInput = forwardRef(
  (
    {
      selectedCountry,
      containerStyle,
      showCountryCodeSearch,
      onValueChange,
      ...textInputProps
    }: PhoneNumberInputProps,
    forwardedRef: Ref<TextInput>,
  ) => {
    return (
      <View style={[styles.container, containerStyle]}>
        <TouchableOpacity
          style={styles.countryIconContainer}
          onPress={showCountryCodeSearch}>
          <View style={styles.countryCodeWrapper}>
            <Text style={styles.countryIcon}>{selectedCountry.flag}</Text>

            <ArrowDownIcon />
          </View>
        </TouchableOpacity>

        <Text style={styles.code}>{selectedCountry.iddCode}</Text>

        <TextInput
          placeholder={`| ${t('global.phone_number')}`}
          keyboardType={'phone-pad'}
          style={styles.phone}
          onChangeText={onValueChange}
          ref={forwardedRef}
          {...textInputProps}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: rem(1.5),
    borderRadius: 13,
    borderColor: COLORS.secondaryLight,
    minHeight: rem(46),
  },
  countryIcon: {
    fontSize: font(24),
    paddingRight: 7,
  },
  countryIconContainer: {
    borderRightWidth: rem(1.5),
    borderRightColor: COLORS.secondaryLight,
    paddingLeft: 15,
    paddingRight: 12,
  },
  code: {
    color: COLORS.primaryDark,
    fontSize: font(14),
    paddingRight: 5,
    fontFamily: FONTS.primary.black,
    paddingLeft: 9,
    alignSelf: 'center',
  },
  phone: {
    fontSize: font(15),
    fontFamily: FONTS.primary.regular,
    color: COLORS.primaryDark,
    flex: 1,
  },
  countryCodeWrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
});
